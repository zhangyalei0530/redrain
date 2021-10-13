function limiting() {
    var limit = true;
    if (Math.random() >= 0.5) {//0.9为大多数允许
        limit = false;
    }
    return limit;
}