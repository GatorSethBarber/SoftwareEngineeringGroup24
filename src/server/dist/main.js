"use strict";
(self["webpackChunkGiftCardXChange"] = self["webpackChunkGiftCardXChange"] || []).push([["main"],{

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _brand_brand_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./brand/brand.component */ 9142);
/* harmony import */ var src_app_login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/login/login.component */ 8458);
/* harmony import */ var src_app_register_register_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/register/register.component */ 9087);
/* harmony import */ var _cards_cards_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cards/cards.component */ 2478);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);







const routes = [{
  path: 'brand',
  component: _brand_brand_component__WEBPACK_IMPORTED_MODULE_0__.BrandComponent
}, {
  path: 'login',
  component: src_app_login_login_component__WEBPACK_IMPORTED_MODULE_1__.LoginComponent
}, {
  path: 'register',
  component: src_app_register_register_component__WEBPACK_IMPORTED_MODULE_2__.RegisterComponent
}, {
  path: 'card',
  component: _cards_cards_component__WEBPACK_IMPORTED_MODULE_3__.CardsComponent
}];
class AppRoutingModule {}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
  return new (t || AppRoutingModule)();
};
AppRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: AppRoutingModule
});
AppRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nav/nav.component */ 5375);



class AppComponent {
  constructor(router) {
    this.router = router;
    this.title = 'GiftCardXChange';
  }
  ngOnInit() {}
}
AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
};
AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-root"]],
  decls: 4,
  vars: 0,
  consts: [[1, "container", "p-3"]],
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-nav");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet, _nav_nav_component__WEBPACK_IMPORTED_MODULE_0__.NavComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser/animations */ 7146);
/* harmony import */ var src_app_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/login/login.component */ 8458);
/* harmony import */ var src_app_register_register_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/register/register.component */ 9087);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _brand_brand_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./brand/brand.component */ 9142);
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nav/nav.component */ 5375);
/* harmony import */ var _cards_cards_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cards/cards.component */ 2478);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/table */ 5288);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ 8562);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/form-field */ 5074);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/paginator */ 6060);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/sort */ 2197);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auth.service */ 2891);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);



















class AppModule {}
AppModule.ɵfac = function AppModule_Factory(t) {
  return new (t || AppModule)();
};
AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
  type: AppModule,
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__.AppComponent]
});
AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
  providers: [_auth_service__WEBPACK_IMPORTED_MODULE_7__.AuthService],
  imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_2__.AppRoutingModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__.BrowserAnimationsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClientModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_13__.MatTableModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInputModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatFormFieldModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__.MatPaginatorModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_17__.MatSortModule, _angular_router__WEBPACK_IMPORTED_MODULE_18__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__.AppComponent, _brand_brand_component__WEBPACK_IMPORTED_MODULE_4__.BrandComponent, _nav_nav_component__WEBPACK_IMPORTED_MODULE_5__.NavComponent, src_app_login_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent, src_app_register_register_component__WEBPACK_IMPORTED_MODULE_1__.RegisterComponent, _cards_cards_component__WEBPACK_IMPORTED_MODULE_6__.CardsComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_2__.AppRoutingModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__.BrowserAnimationsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClientModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_13__.MatTableModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInputModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatFormFieldModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__.MatPaginatorModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_17__.MatSortModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_18__.RouterModule]
  });
})();

/***/ }),

/***/ 2891:
/*!*********************************!*\
  !*** ./src/app/auth.service.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);



class AuthService {
  // headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
  constructor(http) {
    this.http = http;
  }
  getToken() {
    // Todo replace with logic to get token
    return '';
  }
  makeRequestHeader(authorize = false) {
    const header = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');
    if (authorize) {
      header.set('Authorization', `bearer ${this.getToken()}`);
    }
    return header;
  }
  register(userInfor) {
    const headers = this.makeRequestHeader();
    return this.http.post('http://localhost:8080/user/new', userInfor, {
      headers
    });
  }
  login(userInfor) {
    const headers = this.makeRequestHeader();
    return this.http.get(`http://localhost:8080/user/get/${userInfor.userName}/${userInfor.passWord}`, {
      headers
    });
  }
}
AuthService.ɵfac = function AuthService_Factory(t) {
  return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient));
};
AuthService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: AuthService,
  factory: AuthService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 9142:
/*!******************************************!*\
  !*** ./src/app/brand/brand.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrandComponent": () => (/* binding */ BrandComponent)
/* harmony export */ });
/* harmony import */ var _mock_brands__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mock-brands */ 9443);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 124);




const _c0 = function (a0) {
  return {
    brandName: a0
  };
};
function BrandComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 3)(1, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 6)(4, "h5", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const brand_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("state", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](4, _c0, brand_r1.name));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", brand_r1.img, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](brand_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Available cards: ", brand_r1.quantity, "");
  }
}
class BrandComponent {
  constructor() {
    this.state = '';
    this.brands = _mock_brands__WEBPACK_IMPORTED_MODULE_0__.BRANDS;
  }
  ngOnInit() {
    this.state = window.history.state.brandName;
  }
}
BrandComponent.ɵfac = function BrandComponent_Factory(t) {
  return new (t || BrandComponent)();
};
BrandComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: BrandComponent,
  selectors: [["app-brand"]],
  decls: 3,
  vars: 1,
  consts: [[1, "container"], [1, "row"], ["class", "col-md-3 mx-auto my-6 pt-2", 4, "ngFor", "ngForOf"], [1, "col-md-3", "mx-auto", "my-6", "pt-2"], ["routerLink", "/card", "type", "button", 1, "col-md-3", "mx-auto", "my-6", "card", "pt-2", 2, "width", "18rem", 3, "state"], [1, "card-img-top", 3, "src"], [1, "card-body"], [1, "card-title"], [1, "card-text"]],
  template: function BrandComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, BrandComponent_div_2_Template, 8, 6, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.brands);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 2478:
/*!******************************************!*\
  !*** ./src/app/cards/cards.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardsComponent": () => (/* binding */ CardsComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/table */ 5288);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/paginator */ 6060);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/sort */ 2197);
/* harmony import */ var _mock_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mock-cards */ 3244);
/* harmony import */ var _mock_brands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mock-brands */ 9443);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 8562);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 5074);












function CardsComponent_th_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Amount");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CardsComponent_td_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const card_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](card_r10.amount);
  }
}
function CardsComponent_th_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Expiration Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CardsComponent_td_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const card_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](card_r11.expiryDate);
  }
}
function CardsComponent_th_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "User");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CardsComponent_td_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const card_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](card_r12.userID);
  }
}
function CardsComponent_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 19);
  }
}
function CardsComponent_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 20);
  }
}
function CardsComponent_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr", 21)(1, "td", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("No data matching the filter \"", _r0.value, "\"");
  }
}
const _c0 = function () {
  return [5, 10, 25, 100];
};
class CardsComponent {
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(route, router) {
    this.route = route;
    this.router = router;
    this.state = "";
    this.cards = _mock_cards__WEBPACK_IMPORTED_MODULE_0__.CARDS;
    this.brands = _mock_brands__WEBPACK_IMPORTED_MODULE_1__.BRANDS;
    this.columnsToDisplay = ['userID', 'amount', 'expiryDate'];
    this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatTableDataSource(_mock_cards__WEBPACK_IMPORTED_MODULE_0__.CARDS);
  }
  ngOnInit() {
    this.state = window.history.state.brandName;
    this.brands.forEach(brand => {
      if (brand.name == this.state) {
        this.chosenBrand = brand;
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
CardsComponent.ɵfac = function CardsComponent_Factory(t) {
  return new (t || CardsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};
CardsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: CardsComponent,
  selectors: [["app-cards"]],
  viewQuery: function CardsComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_5__.MatPaginator, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_6__.MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
    }
  },
  decls: 25,
  vars: 7,
  consts: [[1, "container"], [1, "row"], ["width", "200rem", 1, "tumbnail", 3, "src"], [1, "mt-3"], ["matInput", "", "placeholder", "Ex. 25", 3, "keyup"], ["input", ""], [1, "mat-elevation-z8"], ["mat-table", "", "matSort", "", 3, "dataSource"], ["matColumnDef", "amount"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "expiryDate"], ["matColumnDef", "userID"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], ["aria-label", "Select page of cards", 3, "pageSizeOptions"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "4", 1, "mat-cell"]],
  template: function CardsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "img", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-form-field", 3)(6, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Filter");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "input", 4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keyup", function CardsComponent_Template_input_keyup_8_listener($event) {
        return ctx.applyFilter($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 6)(11, "table", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](12, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, CardsComponent_th_13_Template, 2, 0, "th", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, CardsComponent_td_14_Template, 2, 1, "td", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](15, 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, CardsComponent_th_16_Template, 2, 0, "th", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, CardsComponent_td_17_Template, 2, 1, "td", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](18, 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, CardsComponent_th_19_Template, 2, 0, "th", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](20, CardsComponent_td_20_Template, 2, 1, "td", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, CardsComponent_tr_21_Template, 1, 0, "tr", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](22, CardsComponent_tr_22_Template, 1, 0, "tr", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](23, CardsComponent_tr_23_Template, 3, 1, "tr", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "mat-paginator", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.chosenBrand.img, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" All Cards for ", ctx.state, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("dataSource", ctx.dataSource);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matHeaderRowDef", ctx.columnsToDisplay);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matRowDefColumns", ctx.columnsToDisplay);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](6, _c0));
    }
  },
  dependencies: [_angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_3__.MatNoDataRow, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatLabel, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_5__.MatPaginator, _angular_material_sort__WEBPACK_IMPORTED_MODULE_6__.MatSort, _angular_material_sort__WEBPACK_IMPORTED_MODULE_6__.MatSortHeader],
  styles: ["table[_ngcontent-%COMP%] {\n    width: 100%;\n}\n\n.mat-mdc-form-field[_ngcontent-%COMP%] {\n    font-size: 14px;\n    width: 100%;\n}\n\ntd[_ngcontent-%COMP%], th[_ngcontent-%COMP%] {\n    width: 25%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY2FyZHMvY2FyZHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGVBQWU7SUFDZixXQUFXO0FBQ2Y7O0FBRUE7O0lBRUksVUFBVTtBQUNkIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUge1xuICAgIHdpZHRoOiAxMDAlO1xufVxuXG4ubWF0LW1kYy1mb3JtLWZpZWxkIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbnRkLFxudGgge1xuICAgIHdpZHRoOiAyNSU7XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 8458:
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginComponent": () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth.service */ 2891);






class LoginComponent {
  constructor(formBuilder, http, router, AuthService) {
    this.formBuilder = formBuilder;
    this.http = http;
    this.router = router;
    this.AuthService = AuthService;
    this.loginForm = this.formBuilder.group({
      userName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
      passWord: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required]
    });
  }
  onSubmit() {
    this.AuthService.login(this.loginForm.value).subscribe(res => {
      console.log(res);
      alert('Yay!!! Welcome');
      this.loginForm.reset();
      this.router.navigate(['brand']);
    }, err => alert('hmmhmm something wrong'));
  }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) {
  return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
};
LoginComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: LoginComponent,
  selectors: [["app-login"]],
  decls: 16,
  vars: 1,
  consts: [[1, "login-page"], [1, "form"], [1, "login"], [1, "login-header"], [3, "formGroup", "ngSubmit"], ["required", "", "formControlName", "userName", "type", "text", "id", "userName", "placeholder", "Username", "formControlName", "userName"], ["required", "", "formControlName", "passWord", "type", "text", "id", "passWord", "placeholder", "Password", "formControlName", "passWord"], ["type", "submit"], [1, "message"], ["routerLink", "/register", 2, "text-decoration", "underline"]],
  template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3")(5, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Login to your account");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "form", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_7_listener() {
        return ctx.onSubmit();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "input", 5)(9, "input", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Log In");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "p", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, " Not a member? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "a", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Sign up now");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.loginForm);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName],
  styles: ["@import url(https://fonts.googleapis.com/css?family=Roboto:300);\nheader[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{\n  background-color: #fff;\n  height: 45px;\n}\n\n\n.login-page[_ngcontent-%COMP%] {\n  width: 360px;\n  padding: 8% 0 0;\n  margin: auto;\n}\n.login-page[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .login[_ngcontent-%COMP%]{\n  margin-top: -31px;\nmargin-bottom: 26px;\n}\n.form[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  background: #FFFFFF;\n  max-width: 360px;\n  margin: 0 auto 100px;\n  padding: 45px;\n  text-align: center;\n  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);\n}\n.form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  font-family: var(--grotesk);\n  outline: 0;\n  background: #f2f2f2;\n  width: 100%;\n  border: 0;\n  margin: 0 0 15px;\n  padding: 15px;\n  box-sizing: border-box;\n  font-size: 14px;\n}\n.form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-family: var(--grotesk);\n  outline: 0;\n  background-image: linear-gradient(45deg,#a0c9ff,#ffbbec);\n  width: 100%;\n  border: 0;\n  padding: 15px;\n  color: black;\n  font-size: 14px;\n  transition: all 0.3 ease;\n  cursor: pointer;\n}\n.form[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%] {\n  margin: 15px 0 0;\n  color: #b3b3b3;\n  font-size: 12px;\n}\n.form[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: black;\n  text-decoration: none;\n}\n\n.container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 300px;\n  margin: 0 auto;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtBQUNkOzs7QUFHQTtFQUNFLFlBQVk7RUFDWixlQUFlO0VBQ2YsWUFBWTtBQUNkO0FBQ0E7RUFDRSxpQkFBaUI7QUFDbkIsbUJBQW1CO0FBQ25CO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsb0JBQW9CO0VBQ3BCLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsMEVBQTBFO0FBQzVFO0FBQ0E7RUFDRSwyQkFBMkI7RUFDM0IsVUFBVTtFQUNWLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsU0FBUztFQUNULGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGVBQWU7QUFDakI7QUFDQTtFQUNFLDJCQUEyQjtFQUMzQixVQUFVO0VBQ1Ysd0RBQXdEO0VBQ3hELFdBQVc7RUFDWCxTQUFTO0VBQ1QsYUFBYTtFQUNiLFlBQVk7RUFDWixlQUFlO0VBRWYsd0JBQXdCO0VBQ3hCLGVBQWU7QUFDakI7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsZUFBZTtBQUNqQjtBQUNBO0VBQ0UsWUFBWTtFQUNaLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEIiLCJzb3VyY2VzQ29udGVudCI6WyJcbkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwKTtcbmhlYWRlciAuaGVhZGVye1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBoZWlnaHQ6IDQ1cHg7XG59XG5cblxuLmxvZ2luLXBhZ2Uge1xuICB3aWR0aDogMzYwcHg7XG4gIHBhZGRpbmc6IDglIDAgMDtcbiAgbWFyZ2luOiBhdXRvO1xufVxuLmxvZ2luLXBhZ2UgLmZvcm0gLmxvZ2lue1xuICBtYXJnaW4tdG9wOiAtMzFweDtcbm1hcmdpbi1ib3R0b206IDI2cHg7XG59XG4uZm9ybSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbiAgYmFja2dyb3VuZDogI0ZGRkZGRjtcbiAgbWF4LXdpZHRoOiAzNjBweDtcbiAgbWFyZ2luOiAwIGF1dG8gMTAwcHg7XG4gIHBhZGRpbmc6IDQ1cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm94LXNoYWRvdzogMCAwIDIwcHggMCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgNXB4IDVweCAwIHJnYmEoMCwgMCwgMCwgMC4yNCk7XG59XG4uZm9ybSBpbnB1dCB7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1ncm90ZXNrKTtcbiAgb3V0bGluZTogMDtcbiAgYmFja2dyb3VuZDogI2YyZjJmMjtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgbWFyZ2luOiAwIDAgMTVweDtcbiAgcGFkZGluZzogMTVweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuLmZvcm0gYnV0dG9uIHtcbiAgZm9udC1mYW1pbHk6IHZhcigtLWdyb3Rlc2spO1xuICBvdXRsaW5lOiAwO1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsI2EwYzlmZiwjZmZiYmVjKTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgcGFkZGluZzogMTVweDtcbiAgY29sb3I6IGJsYWNrO1xuICBmb250LXNpemU6IDE0cHg7XG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMyBlYXNlO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zIGVhc2U7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5mb3JtIC5tZXNzYWdlIHtcbiAgbWFyZ2luOiAxNXB4IDAgMDtcbiAgY29sb3I6ICNiM2IzYjM7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cbi5mb3JtIC5tZXNzYWdlIGEge1xuICBjb2xvcjogYmxhY2s7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuLmNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbiAgbWF4LXdpZHRoOiAzMDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 9443:
/*!********************************!*\
  !*** ./src/app/mock-brands.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BRANDS": () => (/* binding */ BRANDS)
/* harmony export */ });
const BRANDS = [{
  id: 1,
  name: 'Starbucks',
  quantity: 0,
  img: '../assets/images/starbucks.png'
}, {
  id: 2,
  name: 'Target',
  quantity: 4,
  img: '../assets/images/target.png'
}, {
  id: 3,
  name: 'Best Buy',
  quantity: 63,
  img: '../assets/images/best-buy.png'
}, {
  id: 4,
  name: 'Kohls',
  quantity: 21,
  img: '../assets/images/kohls.png'
}];

/***/ }),

/***/ 3244:
/*!*******************************!*\
  !*** ./src/app/mock-cards.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CARDS": () => (/* binding */ CARDS)
/* harmony export */ });
const CARDS = [{
  userID: 103,
  cardID: '2352-241-234',
  amount: 10,
  expiryDate: '02/23',
  brand: 'Starbucks'
}, {
  userID: 103,
  cardID: '7648-653-543',
  amount: 100,
  expiryDate: '04/23',
  brand: 'Target'
}, {
  userID: 251,
  cardID: '5685-231-234',
  amount: 25,
  expiryDate: '07/24',
  brand: 'Starbucks'
}, {
  userID: 103,
  cardID: '1008-241-657',
  amount: 25,
  expiryDate: '07/23',
  brand: 'Best Buy'
}, {
  userID: 251,
  cardID: '2315-653-546',
  amount: 10,
  expiryDate: '09/23',
  brand: 'Target'
}, {
  userID: 103,
  cardID: '2352-241-756',
  amount: 50,
  expiryDate: '10/22',
  brand: 'Kohls'
}, {
  userID: 108,
  cardID: '6567-049-890',
  amount: 25,
  expiryDate: '01/24',
  brand: 'Target'
}, {
  userID: 102,
  cardID: '4311-123-184',
  amount: 5,
  expiryDate: '05/23',
  brand: 'Starbucks'
}, {
  userID: 540,
  cardID: '2345-321-421',
  amount: 5,
  expiryDate: '12/23',
  brand: 'Starbucks'
}, {
  userID: 735,
  cardID: '5432-876-443',
  amount: 10,
  expiryDate: '07/22',
  brand: 'Kohls'
}];

/***/ }),

/***/ 5375:
/*!**************************************!*\
  !*** ./src/app/nav/nav.component.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavComponent": () => (/* binding */ NavComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 124);


class NavComponent {}
NavComponent.ɵfac = function NavComponent_Factory(t) {
  return new (t || NavComponent)();
};
NavComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NavComponent,
  selectors: [["app-nav"]],
  decls: 14,
  vars: 0,
  consts: [[1, "navbar", "navbar-expand-lg", "bg-body-tertiary", "py-3"], [1, "container-fluid"], ["routerLink", "/brand", 1, "navbar-brand"], ["type", "button", "data-bs-toggle", "collapse", "data-bs-target", "#navbarNav", 1, "navbar-toggler"], [1, "navbar-toggler-icon"], ["id", "navbarNav", 1, "collapse", "navbar-collapse"], [1, "navbar-nav"], [1, "nav-item"], ["routerLink", "/brand", 1, "nav-link", "active"], ["routerLink", "/login", 1, "nav-link", "active"]],
  template: function NavComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0)(1, "div", 1)(2, "a", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "GiftCardXChange");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5)(7, "ul", 6)(8, "li", 7)(9, "a", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Brands");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li", 7)(12, "a", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Log In");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLink],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 9087:
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterComponent": () => (/* binding */ RegisterComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth.service */ 2891);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 4666);







function RegisterComponent_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Please enter your username. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RegisterComponent_div_7_div_1_Template, 2, 0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("hidden", ctx_r0.f.username.valid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.f.username.errors == null ? null : ctx_r0.f.username.errors["required"]);
  }
}
function RegisterComponent_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Please enter your first name. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RegisterComponent_div_9_div_1_Template, 2, 0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("hidden", ctx_r1.f.firstName.valid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.f.firstName.errors == null ? null : ctx_r1.f.firstName.errors["required"]);
  }
}
function RegisterComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Please enter your last name. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RegisterComponent_div_11_div_1_Template, 2, 0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("hidden", ctx_r2.f.lastName.valid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.f.firstName.errors == null ? null : ctx_r2.f.firstName.errors["required"]);
  }
}
function RegisterComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Please enter your email. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("hidden", ctx_r3.f.email.valid);
  }
}
function RegisterComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Please enter your password. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("hidden", ctx_r4.f.passWord.valid);
  }
}
function RegisterComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Password should be minimum 6 characters long. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class RegisterComponent {
  constructor(formBuilder, http, router, AuthService) {
    this.formBuilder = formBuilder;
    this.http = http;
    this.router = router;
    this.AuthService = AuthService;
    this.signUpForm = this.formBuilder.group({
      username: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.pattern(/^[A-z0-9]*$/)]],
      firstName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.pattern(/^[A-z0-9]*$/)]],
      lastName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.pattern(/^[A-z0-9]*$/)]],
      email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.email, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      passWord: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(6)]]
    });
  }
  get f() {
    return this.signUpForm.controls;
  }
  signUpSubmitted() {
    this.AuthService.register(this.signUpForm.value).subscribe(res => {
      //console.log('why');
      alert('Yay!!! Welcome');
      this.signUpForm.reset();
      this.router.navigate(['brand']);
    }, err => alert('hmmhmm something wrong'));
  }
}
RegisterComponent.ɵfac = function RegisterComponent_Factory(t) {
  return new (t || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
};
RegisterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: RegisterComponent,
  selectors: [["app-register"]],
  decls: 30,
  vars: 7,
  consts: [[1, "signup-page"], [1, "form"], ["font", "", 1, "signup"], [3, "formGroup", "ngSubmit"], ["type", "text", "placeholder", "Username", "formControlName", "username"], ["class", "alert alert-danger", 3, "hidden", 4, "ngIf"], ["type", "text", "placeholder", "First Name", "formControlName", "firstName"], ["type", "text", "placeholder", "Last Name", "required", "", "formControlName", "lastName"], ["type", "text", "placeholder", "Email", "required", "", "formControlName", "email"], ["type", "text", "placeholder", "Password", "required", "", "formControlName", "passWord"], [4, "ngIf"], ["type", "submit"], [1, "message", 2, "font-size", "10px"], ["routerLink", "/register", 2, "text-decoration", "underline"], ["href", "/register", 2, "text-decoration", "underline"], [1, "message"], ["routerLink", "/login", 2, "font-family", "var(--grotesk)", "font-size", "12px"], [1, "alert", "alert-danger", 3, "hidden"]],
  template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Sign Up");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "form", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function RegisterComponent_Template_form_ngSubmit_5_listener() {
        return ctx.signUpSubmitted();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, RegisterComponent_div_7_Template, 2, 2, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, RegisterComponent_div_9_Template, 2, 2, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "input", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, RegisterComponent_div_11_Template, 2, 2, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "input", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, RegisterComponent_div_13_Template, 2, 1, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "input", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, RegisterComponent_div_15_Template, 2, 1, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, RegisterComponent_div_16_Template, 2, 0, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Create account");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "p", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, " By clicking the Submit,you agree to our ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "a", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "terms and use");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, " and ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "a", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "privacy policy");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "p", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, " Already have an account? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "a", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, " Log in");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.signUpForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.f.username.invalid && (ctx.f.username.dirty || ctx.f.username.touched));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.f.firstName.invalid && (ctx.f.firstName.dirty || ctx.f.firstName.touched));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.f.lastName.invalid && (ctx.f.lastName.dirty || ctx.f.lastName.touched));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.f.email.invalid && (ctx.f.email.dirty || ctx.f.email.touched));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.f.passWord.invalid && (ctx.f.passWord.dirty || ctx.f.passWord.touched));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.f.passWord.errors == null ? null : ctx.f.passWord.errors["minlength"]);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName],
  styles: ["@import url(https://fonts.googleapis.com/css?family=Roboto:300);\nheader[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{\n  background-color: #fff;\n  height: 45px;\n}\n\n\n.login-page[_ngcontent-%COMP%] {\n  width: 360px;\n  padding: 8% 0 0;\n  margin: auto;\n}\n.login-page[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .login[_ngcontent-%COMP%]{\n  margin-top: -31px;\nmargin-bottom: 26px;\n}\n.form[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  background: #FFFFFF;\n  max-width: 360px;\n  margin: 0 auto 100px;\n  padding: 45px;\n  text-align: center;\n  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);\n}\n.form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  font-family: var(--grotesk);\n  outline: 0;\n  background: #f2f2f2;\n  width: 100%;\n  border: 0;\n  margin: 0 0 15px;\n  padding: 15px;\n  box-sizing: border-box;\n  font-size: 14px;\n}\n.form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-family: var(--grotesk);\n  outline: 0;\n  background-image: linear-gradient(45deg,#a0c9ff,#ffbbec);\n  width: 100%;\n  border: 0;\n  padding: 15px;\n  color: black;\n  font-size: 14px;\n  transition: all 0.3 ease;\n  cursor: pointer;\n}\n.form[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%] {\n  margin: 15px 0 0;\n  color: #b3b3b3;\n  font-size: 12px;\n}\n.form[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: black;\n  text-decoration: none;\n}\n\n.container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 300px;\n  margin: 0 auto;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtBQUNkOzs7QUFHQTtFQUNFLFlBQVk7RUFDWixlQUFlO0VBQ2YsWUFBWTtBQUNkO0FBQ0E7RUFDRSxpQkFBaUI7QUFDbkIsbUJBQW1CO0FBQ25CO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsb0JBQW9CO0VBQ3BCLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsMEVBQTBFO0FBQzVFO0FBQ0E7RUFDRSwyQkFBMkI7RUFDM0IsVUFBVTtFQUNWLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsU0FBUztFQUNULGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGVBQWU7QUFDakI7QUFDQTtFQUNFLDJCQUEyQjtFQUMzQixVQUFVO0VBQ1Ysd0RBQXdEO0VBQ3hELFdBQVc7RUFDWCxTQUFTO0VBQ1QsYUFBYTtFQUNiLFlBQVk7RUFDWixlQUFlO0VBRWYsd0JBQXdCO0VBQ3hCLGVBQWU7QUFDakI7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsZUFBZTtBQUNqQjtBQUNBO0VBQ0UsWUFBWTtFQUNaLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEIiLCJzb3VyY2VzQ29udGVudCI6WyJcbkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwKTtcbmhlYWRlciAuaGVhZGVye1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBoZWlnaHQ6IDQ1cHg7XG59XG5cblxuLmxvZ2luLXBhZ2Uge1xuICB3aWR0aDogMzYwcHg7XG4gIHBhZGRpbmc6IDglIDAgMDtcbiAgbWFyZ2luOiBhdXRvO1xufVxuLmxvZ2luLXBhZ2UgLmZvcm0gLmxvZ2lue1xuICBtYXJnaW4tdG9wOiAtMzFweDtcbm1hcmdpbi1ib3R0b206IDI2cHg7XG59XG4uZm9ybSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbiAgYmFja2dyb3VuZDogI0ZGRkZGRjtcbiAgbWF4LXdpZHRoOiAzNjBweDtcbiAgbWFyZ2luOiAwIGF1dG8gMTAwcHg7XG4gIHBhZGRpbmc6IDQ1cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm94LXNoYWRvdzogMCAwIDIwcHggMCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgNXB4IDVweCAwIHJnYmEoMCwgMCwgMCwgMC4yNCk7XG59XG4uZm9ybSBpbnB1dCB7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1ncm90ZXNrKTtcbiAgb3V0bGluZTogMDtcbiAgYmFja2dyb3VuZDogI2YyZjJmMjtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgbWFyZ2luOiAwIDAgMTVweDtcbiAgcGFkZGluZzogMTVweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuLmZvcm0gYnV0dG9uIHtcbiAgZm9udC1mYW1pbHk6IHZhcigtLWdyb3Rlc2spO1xuICBvdXRsaW5lOiAwO1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsI2EwYzlmZiwjZmZiYmVjKTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgcGFkZGluZzogMTVweDtcbiAgY29sb3I6IGJsYWNrO1xuICBmb250LXNpemU6IDE0cHg7XG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMyBlYXNlO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zIGVhc2U7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5mb3JtIC5tZXNzYWdlIHtcbiAgbWFyZ2luOiAxNXB4IDAgMDtcbiAgY29sb3I6ICNiM2IzYjM7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cbi5mb3JtIC5tZXNzYWdlIGEge1xuICBjb2xvcjogYmxhY2s7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuLmNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbiAgbWF4LXdpZHRoOiAzMDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map