import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { BehaviorSubject } from "rxjs";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { Storage } from "@ionic/storage";
import { Platform } from "@ionic/angular";
import { HTTP } from "@ionic-native/http/ngx";
import { testUserAgent } from "@ionic/core/dist/types/utils/platform";
@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  constructor(
    public http: HTTP,
    private sqliteporter: SQLitePorter,
    private storage: Storage,
    private sqlite: SQLite,
    private platform: Platform
  ) {
    // console.log("Database Service.");
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: "test.db",
          location: "default"
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get("database_filled").then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }
  fillDatabase() {
    this.http
      .get("asset/dummy.sql")
      .map(res => res.text())
      .subscribe(sql => {
        this.sqliteporter
          .importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set("database_filled", true);
          })
          .catch(e => console.log(e));
      });
  }

  addData(name) {
    let data = [name];
    return this.database
      .executeSql("INSERT INTO test(name) VALUES(?)", data)
      .then(res => {
        return res;
      });
  }
  getAllData() {
    return this.database.executeSql("select * from test", []).then(
      data => {
        let names = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            names.push({ name: data.rows.item(i).name });
          }
        }
        return names;
      },
      err => {
        console.log("Error: ", err);
        return [];
      }
    );
  }
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
