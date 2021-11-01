"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
function createPagination(_a) {
    var _b = _a.pagesLength, pagesLength = _b === void 0 ? 1 : _b, _c = _a.currentPage, currentPage = _c === void 0 ? 1 : _c, onChange = _a.onChange;
    var setPage = function (n) {
        currentPage = Number(n);
        var pages = getPages();
        typeof onChange === 'function' && onChange(pages);
        return pages;
    };
    var setPagesLength = function (newPagesLength, newCurrentPage) {
        pagesLength = newPagesLength;
        if (newCurrentPage)
            currentPage = newCurrentPage;
        return getPages();
    };
    var getPages = function () {
        var startNumber = (function () {
            if (currentPage - 2 <= 0)
                return 1;
            var overNumber = currentPage + 2 - pagesLength;
            if (overNumber > 0)
                return currentPage - 2 - overNumber;
            return currentPage - 2;
        })();
        var currentRange = Array(5)
            .fill(startNumber)
            .map(function (val, index) {
            var value = val + index;
            return { isActive: value === currentPage, action: 'setPage', value: value };
        })
            .filter(function (_a) {
            var value = _a.value;
            return value >= 1 && value <= pagesLength;
        });
        var firstOption = currentRange.some(function (_a) {
            var value = _a.value;
            return value === 1;
        })
            ? []
            : [{ action: 'setPage', value: 1 }];
        var endOption = currentRange.some(function (_a) {
            var value = _a.value;
            return value === pagesLength;
        })
            ? []
            : [{ action: 'setPage', value: pagesLength }];
        var previousPageOption = currentPage === 1 ? [] : [{ action: 'previousPage', value: 'Prev' }];
        var nextPageOption = currentPage === pagesLength ? [] : [{ action: 'nextPage', value: 'Next' }];
        var getMoreOptions = function (bool) { return (bool ? [{ action: null, value: '...' }] : []); };
        var currentRangeValue = Array.from(currentRange, function (_a) {
            var value = _a.value;
            return value;
        });
        return {
            currentPage: currentPage,
            pages: __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], previousPageOption, true), firstOption, true), getMoreOptions(Math.min.apply(Math, currentRangeValue) > 1 + 1), true), currentRange, true), getMoreOptions(Math.max.apply(Math, currentRangeValue) < pagesLength - 1), true), endOption, true), nextPageOption, true),
        };
    };
    var getCurrentPage = function () { return currentPage; };
    var nextPage = function () { return setPage(currentPage + 1); };
    var previousPage = function () { return setPage(currentPage - 1); };
    var firstPage = function () { return setPage(1); };
    var lastPage = function () { return setPage(pagesLength); };
    return {
        setPage: setPage,
        setPagesLength: setPagesLength,
        getPages: getPages,
        getCurrentPage: getCurrentPage,
        nextPage: nextPage,
        previousPage: previousPage,
        firstPage: firstPage,
        lastPage: lastPage,
    };
}
exports.default = createPagination;
//# sourceMappingURL=index.js.map