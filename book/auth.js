angular.module("bookApp", []).controller("AuthController", function ($scope) {
    $scope.username = "";
    $scope.password = "";
    $scope.errorMessage = "";

    $scope.login = function () {
        // Hardcoded credentials (for demo only)
        if ($scope.username === "admin" && $scope.password === "admin") {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "book.html";
        } else {
            $scope.errorMessage = "Invalid username or password!";
        }
    };
});
