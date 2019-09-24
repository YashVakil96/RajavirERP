import { Component, OnInit } from "@angular/core";
// import { DatabaseService } from "../database.service";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.page.html",
  styleUrls: ["./inventory.page.scss"]
})
export class InventoryPage implements OnInit {
  //   names = [];
  //   name = {};
  //   constructor(private databaseservice: DatabaseService) {
  //     this.databaseservice.getDatabaseState().subscribe(ready => {
  //       if (ready) {
  //         this.loadData();
  //       }
  //     });
  //   }
  //   loadData() {
  //     this.databaseservice.getAllData().then(data => {
  //       this.names = data;
  //     });
  //   }
  //   addData() {
  //     this.databaseservice.addData(this.names["name"]).then(data => {
  //       this.loadData();
  //     });
  //     this.name = {};
  //   }
  ngOnInit() {}
}
