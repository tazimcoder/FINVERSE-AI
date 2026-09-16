const db = require("../../config/db");

const LoanProductModel = {
    async getActiveProducts() {
        const [rows] = await db.query(
            `       SELECT
        id,
        product_code,
        product_name,
        loan_category,
        description,
        min_amount,
        max_amount,
        min_tenure_months,
        max_tenure_months,
        min_interest_rate,
        max_interest_rate,
        processing_fee_type,
        processing_fee_value,
        eligibility_rules,
        requires_property,
        requires_collateral,
        status,
        created_at,
        updated_at
      FROM loan_products
      WHERE status = 'ACTIVE'
      ORDER BY created_at DESC
      `
        );

        return rows;

    },

    async getProductById(productId) {
        const [rows] = await db.query(
            `       SELECT
        id,
        product_code,
        product_name,
        loan_category,
        description,
        min_amount,
        max_amount,
        min_tenure_months,
        max_tenure_months,
        min_interest_rate,
        max_interest_rate,
        processing_fee_type,
        processing_fee_value,
        eligibility_rules,
        requires_property,
        requires_collateral,
        status,
        created_at,
        updated_at
      FROM loan_products
      WHERE id = ?
      LIMIT 1
      `,
            [productId]
        );

        return rows[0] || null;

    },

    async getProductByCode(productCode) {
        const [rows] = await db.query(
            `       SELECT
        id,
        product_code,
        product_name,
        loan_category,
        description,
        min_amount,
        max_amount,
        min_tenure_months,
        max_tenure_months,
        min_interest_rate,
        max_interest_rate,
        processing_fee_type,
        processing_fee_value,
        eligibility_rules,
        requires_property,
        requires_collateral,
        status,
        created_at,
        updated_at
      FROM loan_products
      WHERE product_code = ?
      LIMIT 1
      `,
            [productCode]
        );

        return rows[0] || null;

    }
};

module.exports = LoanProductModel;
