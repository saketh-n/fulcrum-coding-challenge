type Requirement = {
    required_coverage: {
        employee: number;
        property: number;
    };
    max_budget: number;
    max_risk: number;
};

type Policy = {
    id: string;
    coverage: {
        employee: number;
        property: number;
    };
    cost: number;
    risk: number;
};

type Synergy = {
    [key: string]: {
        cost_discount_percentage: number;
        risk_increase: number;
    };
};

function selectPolicies(
    policies: Policy[],
    requirements: Requirement,
    synergies?: Synergy
): string[] {
    const employeeReq = requirements.required_coverage.employee;
    const propertyReq = requirements.required_coverage.property;
    const maxBudget = requirements.max_budget;
    const maxRisk = requirements.max_risk;

    let minCost = Infinity;
    let bestCombination: string[] = [];

    // Helper function to apply synergies
    function applySynergies(selectedPolicies: Policy[]): { totalCost: number; totalRisk: number } {
        let totalCost = selectedPolicies.reduce((sum, p) => sum + p.cost, 0);
        let totalRisk = selectedPolicies.reduce((sum, p) => sum + p.risk, 0);

        if (synergies) {
            for (const synergyKey in synergies) {
                const policyIds = JSON.parse(synergyKey) as string[];
                // Check if all policies in the synergy are selected
                if (policyIds.every(id => selectedPolicies.some(p => p.id === id))) {
                    const { cost_discount_percentage, risk_increase } = synergies[synergyKey];
                    totalCost *= (1 - cost_discount_percentage / 100);
                    totalRisk += risk_increase;
                }
            }
        }

        return { totalCost, totalRisk };
    }

    // Backtracking function to explore combinations
    function backtrack(
        index: number,
        selected: Policy[],
        currEmployee: number,
        currProperty: number,
        currCost: number,
        currRisk: number
    ) {
        // Check if current combination meets coverage requirements
        if (currEmployee >= employeeReq && currProperty >= propertyReq) {
            const { totalCost, totalRisk } = applySynergies(selected);
            if (totalCost <= maxBudget && totalRisk <= maxRisk && totalCost < minCost) {
                minCost = totalCost;
                bestCombination = selected.map(p => p.id);
            }
        }

        // Explore further policies
        for (let i = index; i < policies.length; i++) {
            const policy = policies[i];
            // Prune if adding this policy exceeds budget or risk (before synergies)
            if (currCost + policy.cost > maxBudget || currRisk + policy.risk > maxRisk) {
                continue;
            }
            backtrack(
                i + 1,
                [...selected, policy],
                currEmployee + policy.coverage.employee,
                currProperty + policy.coverage.property,
                currCost + policy.cost,
                currRisk + policy.risk
            );
        }
    }

    // Handle edge cases
    if (maxBudget < 0 || maxRisk < 0 || !policies.length) {
        return [];
    }

    // Start backtracking
    backtrack(0, [], 0, 0, 0, 0);

    return bestCombination;
}