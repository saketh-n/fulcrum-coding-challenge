# Running the Policy Optimization Code

To run the `selectPolicies` function with a given `policyList`, `requirements`, and `synergies`, follow these steps:

1. **Prerequisites**:
   - Install Node.js (v14+): https://nodejs.org/
   - Install TypeScript and ts-node:
     ```bash
     npm install -g typescript ts-node
     ```

2. **Setup**:
   - Save the `selectPolicies` function in `policyOptimization.ts`.
   - Create `main.ts` with your inputs and the function call:

     ```typescript
     import { selectPolicies } from './policyOptimization';

     const policyList = [
       { id: "P1", coverage: { employee: 60, property: 100 }, cost: 600, risk: 2 },
       { id: "P2", coverage: { employee: 40, property: 150 }, cost: 700, risk: 3 }
     ];

     const requirements = {
       required_coverage: { employee: 100, property: 200 },
       max_budget: 1300,
       max_risk: 5
     };

     const synergies = {
       '["P1","P2"]': { cost_discount_percentage: 10, risk_increase: 1 }
     };

     console.log("Selected Policies:", selectPolicies(policyList, requirements, synergies));
     ```

3. **Run**:
   - In the terminal, navigate to the directory with `main.ts` and run:
     ```bash
     ts-node main.ts
     ```
   - Expected output (example): `Selected Policies: []` (due to risk > 5 after synergy).

4. **Test Samples**:
   - Use README sample cases (e.g., P-1A, P-2A) by updating `policyList`, `requirements`, and `synergies` in `main.ts`.

5. **Troubleshooting**:
   - Ensure types match `Policy`, `Requirement`, and `Synergy`.
   - Check synergy keys (e.g., `'["P1","P2"]'`) and input validity.
   - If `[]` is returned, verify constraints allow a valid combination.