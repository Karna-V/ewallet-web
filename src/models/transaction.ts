export class TransactionData {
    id: string | null = null
    senderId: string | null = null
    recipientId: string | null = null
    description: string | null = null
    amount: number | null = null
    paymentType: string | null = null
    status: string | null = null
    transactionDate: string | null = null
    recipientData: RecipientData | null = null;

    constructor(transactionData?: TransactionData) {
        if (transactionData) {
            this.deserialize(transactionData)
        }
    }

    private deserialize(transactionData: TransactionData) {
        const keys = Object.keys(this);
        for (const key of keys) {
            switch (key) {
                case "recipientData":
                    this[key] = transactionData.recipientData ? new RecipientData(transactionData[key]!) : null;
                    break;
                default:
                    (this as any)[key] = (transactionData as any)[key];
            }
        }
    }
}

export class RecipientData {
    name: string | null = null
    constructor(recipientData?: any) {
        if (recipientData) {
            this.deserialize(recipientData)
        }
    }

    private deserialize(recipientData: RecipientData) {
        const keys = Object.keys(this);
        for (const key of keys) {
            if (recipientData.hasOwnProperty(key)) {
                (this as any)[key] = (recipientData as any)[key];
            }
        }
    }
}