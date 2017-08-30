// eslint-disable-next-line
Array.prototype.clone = function() {
    return this.slice(0);
}

// eslint-disable-next-line
Array.prototype.remove = function(element) {
    this.splice(this.indexOf(element), 1);
}

// eslint-disable-next-line
Array.prototype.random = function(count = 1) {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(this[Math.floor(Math.random() * this.length)]);
    }
    return count === 1? result[0] : result;
}

// eslint-disable-next-line
if(Array.prototype.includes == undefined) {
    console.log('Browser does not support Array.includes(), plugging in support');
    // eslint-disable-next-line
    Array.prototype.includes = function(el) {
        for (let i of this) {
            if (i === el) return true;
        }
        return false;
    }
}