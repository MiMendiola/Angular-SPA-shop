let searchBtn = document.querySelector('#search-btn');
let searchForm = document.querySelector('.header .search-form');

searchBtn.onclick = () =>{
   searchBtn.classList.toggle('fa-times');
   searchForm.classList.toggle('active');
   menuBtn.classList.remove('fa-times');
   navbar.classList.remove('active');
}

let menuBtn = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menuBtn.onclick = () =>{
   menuBtn.classList.toggle('fa-times');
   navbar.classList.toggle('active');
   searchBtn.classList.remove('fa-times');
   searchForm.classList.remove('active');
}

window.onscroll = () =>{
   searchBtn.classList.remove('fa-times');
   searchForm.classList.remove('active');
   menuBtn.classList.remove('fa-times');
   navbar.classList.remove('active');
}

let item = [];

let dataProd = [{"id":1,"name":"la passion","price":79.99, 'src':'../src/img/perfume/product-1.png', 'qyn':1, "description":"Launched by the design house of Elizabeth Taylor in 1987, PASSION is classified as a refined, oriental, woody fragrance."}, {"id":2,"name":"calvin klaine","price":30.5, 'src':'../src/img/perfume/product-2.png', "description":"Fresh and fruity top notes of clean lavender and juicy mandarin orange leave you feeling invigorated from the first whiff, leading into a floral heart of lush magnolia and refreshing freesia that swirls around you as you move throughout your day."},{"id":3,"name":"gean jaul gaultier","price":158, 'src':'../src/img/perfume/product-3.png', "description":"In the secret, colourful garden of her metal tin, the new La Belle Fleur Terrible nymph lives life naked with just a drop of aquatic amber floral fragrance on the neck of her blue lagoon bottle."}, {"id":4,"name":"alghabra","price":74.39, 'src':'../src/img/perfume/product-4.png', "description":"The fragrance begins with cheerful hints from Kumquat and Lime as its top notes. The heart consists of pleasant mix of notes from Violet, Lily-of-the-valley, Jasmine and Orris."}, {"id":5,"name":"emily in paris","price":120, 'src':'../src/img/perfume/product-5.png', "description":"The iconic Idôle fragrance you love, adorned in a beautiful exclusive edition LANCÔME x EMILY IN PARIS LIMITED EDITION"}, {"id":6,"name":"hugo boss","price":42.2, 'src':'../src/img/perfume/product-6.png', "description":"Introduced in 1995, this fragrance blends floral notes of fresh citrus with bold notes of spicy leaves and woods to create an invigorating, energetic aroma."}];

// creating the app
let finalProject = angular.module('MF_App', ['ngRoute']);

// here we inicialice diferents variables for all the pages
finalProject.run(function($rootScope){
    $rootScope.login_flag = false;

});

// configurating our navigation panel and his controllers
finalProject.config(function($routeProvider){
    $routeProvider
    .when("/", {templateUrl:"./src/pages/home.html", controller:"home_ctrl", styleUrls:['./css/style.css']})
    .when("/shop", {templateUrl:"./src/pages/shop.html", controller:"shop_ctrl", styleUrls:['./css/style.css']})
    .when("/about", {templateUrl:"./src/pages/about.html", controller:"about_ctrl", styleUrls:['./css/style.css']})
    .when("/reviews", {templateUrl:"./src/pages/reviews.html", controller:"reviews_ctrl", styleUrls:['./css/style.css']})
    .when("/contact", {templateUrl:"./src/pages/contact.html", controller:"contact_ctrl", styleUrls:['./css/style.css']})
    .when("/login", {templateUrl:"./src/pages/login.html", controller:"login_ctrl", styleUrls:['./css/style.css']})
    .when("/cart", {templateUrl:"./src/pages/cart.html", controller:"cart_ctrl", styleUrls:['./css/style.css']})
    .when("/logout", {templateUrl:"./src/pages/exit.html", controller:"exit_ctrl", styleUrls:['./css/style.css']})
    .otherwise({templateUrl:"404.html"});
});

// controller for the shop page
finalProject.controller('shop_ctrl', function($scope){
    $scope.data = dataProd;
    $scope.item = item;

    $scope.addCart = (id) =>{
        let tmpItem = {id:id,name:$scope.data[id].name,price:$scope.data[id].price};

        $scope.item.push(tmpItem);
        let itemData = JSON.stringify($scope.item);

        sessionStorage.setItem('item',itemData);
    };
});

// controller for the login page
finalProject.controller('login_ctrl', function($scope){
    $scope.usernameLogin = "";
    $scope.passwordLogin = "";

    let modalSelected = document.querySelectorAll("div.modal")[0];
    let modalToHide = document.querySelectorAll("div.modal")[1];
    modalToHide.style.display = "none";

    $scope.showRegister = () =>{
        modalSelected.style.display = "none";

        if ((modalToHide.style.display = "none")) {
            modalToHide.style.display = "block";
        }       
    };
    
    $scope.showLogin = () =>{
        modalToHide.style.display = "none";

        if ((modalSelected.style.display = "none")) {
            modalSelected.style.display = "block";
        }    
    };

    $scope.showPass = () =>{
        var type = document.getElementById("see");
        if(type.type == "password"){
            type.type = "text";
        }else{
            type.type = "password";
        }
    };

    $scope.keepInfoLogin = () =>{
        if($scope.usernameLogin != "" && $scope.passwordLogin != ""){
            if(document.cookie != ''){
                if($scope.usernameLogin != JSON.parse(document.cookie).username && $scope.usernameLogin != JSON.parse(document.cookie).password){
                    alert('Username/Password wrong');
                }else{
                    alert('Welcome again, '+$scope.usernameLogin);
                    window.location = "#/!";
                    $scope.usernameLogin = "";
                    $scope.passwordLogin = "";

                    $rootScope.login_flag = true;

                };
            }else{
                alert('We see that you don`t have any count, please go to the register form');
                $scope.showRegister();
                $scope.usernameLogin = "";
                $scope.passwordLogin = "";
            }
        }
    };
    
    $scope.keepInfoRegister = () =>{
        console.log($scope.email)

        if($scope.username != "" && $scope.passwordRegister != "" && $scope.email != "" && $scope.adress != "" && $scope.phone != ""){
                       
            let user_Data = JSON.stringify({username:$scope.username, password:$scope.passwordRegister, email:$scope.email, adress:$scope.adress, phone:$scope.phone});

            document.cookie = user_Data; 
            alert('Registration Completed '+$scope.username);
            window.location = "#!login";
            $scope.username = "";
            $scope.passwordRegister = "";
            $scope.email = "";
            $scope.adress = "";
            $scope.phone = "";
        }else{
            alert('Please fill all the information to complete the registration');
            $scope.username = "";
            $scope.passwordRegister = "";
            $scope.email = "";
            $scope.adress = "";
            $scope.phone = "";
        }
    };
});
        

// controller for the cart page
finalProject.controller('cart_ctrl', function($scope){
    let seeData = JSON.parse(sessionStorage.getItem('item'));
    $scope.data = seeData;
    $scope.totalPrice = 0;

    seeData.forEach(value => {
        $scope.totalPrice = $scope.totalPrice + value.price;
    });
    
    // IN PROGRESS
    // delete the information of the product
    // $scope.deleteInfo = (key,event) =>{
    //     event.target.parentElement.parentElement.remove(key);

    //     $scope.totalPrice = 0;
    //     for(let i=0;i<$scope.prices.length;i++){
    //         $scope.totalPrice += $scope.prices[i];
    //     }
    // };
    
});


// controller for the exit page
finalProject.controller('exit_ctrl', function($scope,$rootScope){
    $scope.data_user = JSON.parse(document.cookie).username;

    $scope.logout = () =>{
        $rootScope.login_flag = false;
        window.location = "#/!";
    }
    $scope.cancel = () =>{
        $rootScope.login_flag = true;
        window.location = "#!shop";
    }
});