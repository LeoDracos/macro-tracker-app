export class User {
    private id: number;
    private username: string;
    private password: string;
    private email: string;
    private targetCalories: number;
    private targetProtein: number;
    private targetCarbs: number;
    private targetFat: number;

    get calories(): number {
        return this.targetCalories;
    }
    get protein(): number {
        return this.targetProtein;
    }
    get carbs(): number {
        return this.targetCarbs;
    }
    get fat(): number {
        return this.targetFat;
    }
    get userId(): number {
        return this.id;
    }
    get getUsername() : string {
        return this.username;
    }
    get getPassword() : string {
        return this.password;
    }
    get getEmail() : string {
        return this.email;
    }

    

    set calories(value: number) {
        this.targetCalories = value;
    }
    set protein(value: number) {
        this.targetProtein = value;
    }
    set carbs(value: number) {
        this.targetCarbs = value;
    }
    set fat(value: number) {
        this.targetFat = value;
    }

    constructor(data: Partial<User> = {}) {
        this.id = data.userId || 0;
        this.username = data.getUsername || '';
        this.password = data.getPassword || '';
        this.email = data.getEmail || '';
        this.targetCalories = data.calories || 0;
        this.targetProtein = data.protein || 0;
        this.targetCarbs = data.carbs || 0;
        this.targetFat = data.fat || 0;
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