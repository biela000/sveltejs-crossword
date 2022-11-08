var BoxStatus;
(function (BoxStatus) {
    BoxStatus[BoxStatus["EMPTY"] = 0] = "EMPTY";
    BoxStatus[BoxStatus["USER_FILLED"] = 1] = "USER_FILLED";
    BoxStatus[BoxStatus["AUTO_FILLED"] = 2] = "AUTO_FILLED";
    BoxStatus[BoxStatus["SUCCESSFULLY_FILLED"] = 3] = "SUCCESSFULLY_FILLED";
    BoxStatus[BoxStatus["PLACEHOLDING"] = 4] = "PLACEHOLDING";
})(BoxStatus || (BoxStatus = {}));
export default BoxStatus;
//# sourceMappingURL=BoxStatus.js.map