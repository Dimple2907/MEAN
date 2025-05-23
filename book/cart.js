var app = angular.module("bookApp", []);

app.controller("CartController", function ($scope) {
    $scope.cart = JSON.parse(localStorage.getItem("cart")) || [];

    $scope.getTotal = function () {
        return $scope.cart.reduce(function (sum, book) {
            return sum + book.price * book.quantity;
        }, 0);
    };

    $scope.removeItem = function (index) {
        $scope.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify($scope.cart));
    };

    $scope.updateQuantity = function () {
        localStorage.setItem("cart", JSON.stringify($scope.cart));
    };

    $scope.logout = function () {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "login.html";
    };

    // Redirect if not logged in
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "login.html";
    }
});
