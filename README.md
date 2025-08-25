# Fulcrum Live Programming Challenge

## Policy Optimization Challenge

**Context:**

You are working with an insurance broker to build a next-generation tool that matches clients with optimal insurance policy portfolios. You will be provided with a list of policies and customer requirements, and your job is to write a program to find the best match.

---

**Problem Statement:**

You will be provided with a list of available policies and customer’s requirements. Your program needs to output the optimal selection taking into account the constraints and the customer’s preferences. 

---

### Part 1: Basic Policy Selection

**Goal:**

Select a combination of policies that meets all of the requirements:

1. Meets or exceeds the client’s required coverage for all specified categories.
2. Does not exceed the client’s maximum budget.
3. Does not exceed the client’s maximum risk tolerance.
4. Minimizes total cost.

**Inputs:**

- **Policies:** A list of policies. Each policy has:
    - `id`: A unique string (e.g., "P1").
    - `coverage`: A mapping of the coverage category to its amount.
        - e.g., `{ "employee": 60, "property": 100 }`
    - `cost`:  Cost to include the policy (integer)
    - `risk`:  A risk score to include the policy (integer)
- **Client Requirements:**
    - `required_coverage`: Mapping of required coverage amounts per category
        - e.g. `{"employee": 100, "property": 200}`
    - `max_budget`: Maximum allowed total cost across all policies.
    - `max_risk`: Maximum allowed total risk across all policies.

**Output:**

A list of policy IDs that meet all requirements with the lowest total cost.

### Sample Input

**Policies:** A list where each policy provides *quantitative* coverage. For example:

```json
[
  {"id": "P1", "coverage": {"employee": 60, "property": 100}, "cost": 600, "risk": 2},
  {"id": "P2", "coverage": {"employee": 40, "property": 150}, "cost": 700, "risk": 3},
  {"id": "P3", "coverage": {"employee": 100, "property": 200}, "cost": 1400, "risk": 5}
]
```

**Client Requirements:**

```json
{
  "required_coverage": {
    "employee": 100,
    "property": 200
  },
  "max_budget": 1300,
  "max_risk": 5
}
```

**Output**

```json
["P1", "P2"]
```

**Sample Data**

```tsx
[
  {
    "description": "P-1A · One policy covers everything",
    "policies": [
      { "id": "S1", "coverage": { "employee": 120, "property": 220 }, "cost": 1000, "risk": 3 },
      { "id": "S2", "coverage": { "employee": 60,  "property": 100 }, "cost": 500,  "risk": 2 }
    ],
    "client_requirements": {
      "required_coverage": { "employee": 100, "property": 200 },
      "max_budget": 1100,
      "max_risk": 4
    },
    "expected_output": ["S1"]
  },
  {
    "description": "P-1B · Need two cheaper policies to hit coverage",
    "policies": [
      { "id": "A1", "coverage": { "employee": 40,  "property":  80 }, "cost": 300, "risk": 1 },
      { "id": "A2", "coverage": { "employee": 60,  "property": 120 }, "cost": 450, "risk": 2 },
      { "id": "A3", "coverage": { "employee": 100, "property": 210 }, "cost": 900, "risk": 4 }
    ],
    "client_requirements": {
      "required_coverage": { "employee": 100, "property": 200 },
      "max_budget": 800,
      "max_risk": 4
    },
    "expected_output": ["A1", "A2"]
  }

```

### Part 2: Adding Interactions

We’re adding interactions between certain policies. When these specific policy combinations 

Now, introduce **interactions (synergies)** between certain policies. When these specific policy combinations are selected together, apply:

- A cost discount percentage to their combined cost.
- A risk increase added to their total risk.

**Goal:**

Still select a combination that meets coverage requirements, budget, and risk, but now consider these synergy effects when determining total cost and risk.

**Inputs (Part 2):**

- Same policies and requirements as Part 1.
- A set of synergy rules, for example:
    
    ```json
    {
      "synergies": {
        ["P1", "P2"]: {"cost_discount_percentage": 10, "risk_increase": 1}
      }
    }
    ```
    

**Output**

```
[]
// No possible combinations since P1, P2 becomes too risky
```

**Sample Data**

```tsx
[
  {
    "description": "P-2A · Synergy discount makes the pair optimal",
    "policies": [
      { "id": "B1", "coverage": { "liability": 60, "auto": 60 }, "cost": 400, "risk": 2 },
      { "id": "B2", "coverage": { "liability": 50, "auto": 50 }, "cost": 350, "risk": 2 },
      { "id": "B3", "coverage": { "liability": 120,"auto": 120}, "cost": 950, "risk": 5 }
    ],
    "client_requirements": {
      "required_coverage": { "liability": 100, "auto": 100 },
      "max_budget": 700,
      "max_risk": 5
    },
    "synergies": {
      "[\"B1\",\"B2\"]": { "cost_discount_percentage": 20, "risk_increase": 0 }
    },
    "expected_output": ["B1", "B2"]
  },
  {
    "description": "P-2B · Synergy pushes risk over the limit—fallback to single policy",
    "policies": [
      { "id": "C1", "coverage": { "cyber": 60, "property": 60 },  "cost": 300, "risk": 1 },
      { "id": "C2", "coverage": { "cyber": 60, "property": 60 },  "cost": 350, "risk": 2 },
      { "id": "C3", "coverage": { "cyber": 120,"property": 120 }, "cost": 800, "risk": 3 }
    ],
    "client_requirements": {
      "required_coverage": { "cyber": 120, "property": 120 },
      "max_budget": 900,
      "max_risk": 4
    },
    "synergies": {
      "[\"C1\",\"C2\"]": { "cost_discount_percentage": 10, "risk_increase": 2 }
    },
    "expected_output": ["C3"]
  }
]

```

**Deliverables:**

1. The complete code for the solution with any instructions to build or run the program
2. A brief description of the approach.