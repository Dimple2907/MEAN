var app = angular.module("bookApp", []);

app.controller("BookListController", function ($scope) {
    // Full list of books with all needed properties
    $scope.books = [
        { id: 1, title: "The Alchemist", category: "Fiction", description: "A journey of self-discovery.", price: 499, image: "assets/alchemist.jpeg", quantity: 1 },
        { id: 2, title: "Atomic Habits", category: "Non-Fiction", description: "Building good habits.", price: 350, image: "assets/habits.jpeg", quantity: 1 },
        { id: 3, title: "Steve Jobs", category: "Biography", description: "The life of Steve Jobs.", price: 450, image: "assets/stevejobs.jpeg", quantity: 1 },
        { id: 4, title: "The Dark Knight Returns", category: "Action", description: "Batman fights crime in Gotham.", price: 400, image: "assets/batman.jpeg", quantity: 1 },
        { id: 5, title: "Rich Dad Poor Dad", category: "Non-Fiction", description: "Financial education and investment tips.", price: 400, image: "assets/richdad.jpeg", quantity: 1 },
        { id: 6, title: "1984", category: "Fiction", description: "A classic dystopian novel.", price: 300, image: "assets/1984.jpeg", quantity: 1 },
      ];

    // Initialize filteredBooks
    $scope.filteredBooks = angular.copy($scope.books);
    $scope.selectedCategory = "";
    $scope.searchQuery = "";
    $scope.categories = [...new Set($scope.books.map(book => book.category))];
    $scope.begin = 0;

    $scope.filterBooks = function () {
        $scope.filteredBooks = $scope.books.filter(function (book) {
            return !$scope.selectedCategory || book.category === $scope.selectedCategory;
        });
        $scope.begin = 0;
    };

    $scope.searchBooks = function () {
        $scope.filteredBooks = $scope.books.filter(function (book) {
            const query = $scope.searchQuery.toLowerCase();
            return book.title.toLowerCase().includes(query) || book.category.toLowerCase().includes(query);
        });
        $scope.begin = 0;
    };

    $scope.viewDetails = function (book) {
        $scope.selectedBook = book;
        if (!book.quantity || book.quantity < 1) {
            book.quantity = 1;
        }
    };

    $scope.closeDetails = function () {
        $scope.selectedBook = null;
    };

    $scope.addToCart = function (book) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let existing = cart.find(item => item.id === book.id);
        if (existing) {
            existing.quantity += book.quantity;
        } else {
            cart.push({ ...book }); // clone book object
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Book added to cart!");
    };

    $scope.getCartCount = function () {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    };

    $scope.nextPage = function () {
        if ($scope.begin + 2 < $scope.filteredBooks.length) {
            $scope.begin += 2;
        }
    };

    $scope.prevPage = function () {
        if ($scope.begin >= 2) {
            $scope.begin -= 2;
        }
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
