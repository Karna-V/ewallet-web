export class UserData {
    id: string | null = null
    name: string | null = null
    username: string | null = null
    password: string | null = null
    emailId: string | null = null
    phone: Phone | null = null
    walletBalance: number | null = null
    createdOn: string | null = null
    updatedOn: string | null = null

    constructor(userData?: any) {
        if (userData) {
            this.deserialize(userData);
        }
    }

    private deserialize(userData: UserData) {
        const keys = Object.keys(userData);
        for (const key of keys) {
            switch (key) {
                case "phone":
                    this[key] = userData.phone ? new Phone(userData[key]!) : null;
                    break;
                default:
                    (this as any)[key] = (userData as any)[key];
            }
        }
    }

}

export class Phone {
    countryCode: string | null = "91"
    number: string | null = null
    constructor(phone?: Phone) {
        if (phone) {
            this.deserialize(phone)
        }
    }

    private deserialize(phone: Phone) {
        const keys = Object.keys(this);
        for (const key of keys) {
            if (phone.hasOwnProperty(key)) {
                (this as any)[key] = (phone as any)[key];
            }
        }
    }
}