export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    targetCalories: number;
    targetProtein: number;
    targetCarbs: number;
    targetFat: number;

    constructor(data: Partial<User> = {}) {
        this.id = data.id || 0;
        this.username = data.username || '';
        this.password = data.password || '';
        this.email = data.email || '';
        this.targetCalories = data.targetCalories || 0;
        this.targetProtein = data.targetProtein || 0;
        this.targetCarbs = data.targetCarbs || 0;
        this.targetFat = data.targetFat || 0;
    }

    isLoggedIn(): boolean {
        return this.id > 0;
    }

    fromJSON(json: any): User {
        this.id = json.id;
        this.username = json.username;
        this.password = json.password;
        this.email = json.email;
        this.targetCalories = json.targetCalories;
        this.targetProtein = json.targetProtein;
        this.targetCarbs = json.targetCarbs;
        this.targetFat = json.targetFat;
        return this;
    }
}