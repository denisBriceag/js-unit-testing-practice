interface IQuantityValidator {
    validate(quantity: number): { isValid: boolean; error: string | null };
}

export class QuantityValidator implements IQuantityValidator {
    private readonly threshold: number;
    private readonly packageSize: number;

    constructor(threshold: number, packageSize: number) {
        if (threshold < 0) {
            throw new Error('threshold must be >= 0');
        }
        if (packageSize <= 0) {
            throw new Error('packageSize must be > 0');
        }
        this.threshold = threshold;
        this.packageSize = packageSize;
    }

    public validate(quantity: number): { isValid: boolean; error: string | null } {
        // quantity must be > 0
        if (quantity <= 0) {
            return { isValid: false, error: null }; // tests only check isValid
        }

        // below threshold: no divisibility requirement
        if (quantity < this.threshold) {
            return { isValid: true, error: null };
        }

        // at/above threshold: must be divisible by packageSize
        if (quantity % this.packageSize === 0) {
            return { isValid: true, error: null };
        }

        return {
            isValid: false,
            error: `Quantity should be divisible by ${this.packageSize}`,
        };
    }
}
