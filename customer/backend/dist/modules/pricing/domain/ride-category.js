export var RideCategoryType;
(function (RideCategoryType) {
    RideCategoryType["BIKE"] = "BIKE";
    RideCategoryType["AUTO"] = "AUTO";
    RideCategoryType["MINI_SEDAN"] = "MINI_SEDAN";
})(RideCategoryType || (RideCategoryType = {}));
export const CATEGORIES = {
    [RideCategoryType.BIKE]: { id: 'cat_bike', code: RideCategoryType.BIKE, displayName: 'GoRush Bike', description: 'Beat the traffic', capacity: 1 },
    [RideCategoryType.AUTO]: { id: 'cat_auto', code: RideCategoryType.AUTO, displayName: 'GoRush Auto', description: 'No haggling, just riding', capacity: 3 },
    [RideCategoryType.MINI_SEDAN]: { id: 'cat_mini', code: RideCategoryType.MINI_SEDAN, displayName: 'GoRush Mini', description: 'Comfortable sedans', capacity: 4 },
};
//# sourceMappingURL=ride-category.js.map