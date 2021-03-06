import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

// import { DatabaseService } from "./database.service";

import { IonicStorageModule } from "@ionic/storage";
import { HttpClientModule } from "@angular/common/http";

import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { SQLite } from "@ionic-native/sqlite/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    // DatabaseService,
    // SQLite,
    // SQLitePorter
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
