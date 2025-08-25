type Requirement = {
    "required_coverage": {
        "employee": number;
        "property": number;
    },
    "max_budget": number,
    "max_risk": number,
}

type Policy = {
    "id": string,
    "coverage": {
        "employee": number,
        "property": number,
    },
    "cost": number,
    "risk": number,
}

type Synergy = {
    [policyId: string]: {
        "cost_discount_percentage": number,
        "risk_increase": number
    }

}

const selectPolicies = (policies: Policy[], requirements: Requirement, synergies?: Synergy[], totalCost?: number): selectedPolicies: Policy[] => {
    const employee = requirements["required_coverage"]["employee"];
    const property = requirements["required_coverage"]["property"];
    const maxBudget = requirements["max_budget"];
    const maxRisk = requirements["max_risk"];

    // find set of policies where sum of employee coverage and property coverage greater than or equal to employee and property coverage
    // but where the sum of the budget and risk is less than or equal to maxBudget and maxRisk

    // Find the set of all policy combinations that meet the employee and property coverage
    // These will be the values in a map, key for the map is a pair of that policy list's [totalRisk, totalCost]

    const policyCombinations = new Map<[risk:number, cost: number], Policy[]>();

    const currentPolicySet: Policy[] = [];
    const totalRisk = 0;
    const totalCost = 0;

    if (requirements.max_budget < 0 || requirements.max_risk < 0) {
        return [];
    }

    if (policies.length === 0) {
        return [];
    }

    if (policies.length === 1) {
        if (policies[0].coverage["employee"] >= employee && policies[0].coverage["property"] >= property && policies[0].cost <= maxBudget && policies[0].risk <= maxRisk) {
            // account for synergies if present

            return [policies[0]];
        } else {
            return [];
        }
    }

    const validPolicies: Policy[][] =  [];

    for (const policy of policies) {
        const newRequirement = {
            "required_coverage": {
                "employee": employee - policy.coverage["employee"],
                "property": property - policy.coverage["property"],
            },
            "max_budget": maxBudget - policy.cost,
            "max_risk": maxRisk - policy.risk,
        }
        const updatedSynergies = synergies?.map(synergy => synergy.policyId.filter(p => p.id !== policy.id));
        validPolicies.push(selectPolicies(policies.filter(p => p.id !== policy.id), newRequirement, updatedSynergies));
    }

    let minCost = maxBudget;
    let minPolicyList: Policy[] = [];
    for (const policyList of validPolicies) {
        let totalCost = // sum of the costs of the policy list
        if (totalCost < minCost) {
            minCost = totalCost;
            minPolicyList = policyList;
        }
    }

    return minPolicyList;

}