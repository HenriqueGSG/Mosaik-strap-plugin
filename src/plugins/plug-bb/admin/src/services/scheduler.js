import cron from "node-cron";
import axios from "axios";

const BASE_URL = "http://localhost:1337/api/productions/";

const updateRule = async (preProdRuleV, prodRuleV) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const idRule = prodRuleV.id;

    prodRuleV.rule = preProdRuleV.attributes.rule;
    const response = await axios.put(
      `${BASE_URL}${idRule}`,
      { data: prodRuleV },
      {
        headers,
      }
    );
    const responseData = response.data;
    const { id, attributes } = responseData.data;
    const { Name, rule } = attributes;
    console.log(`Rule updated: ${Name}, Rule: ${rule}`);
  } catch (error) {
    console.error("Error updating rule:", error);
  }
};

export const scheduleUpdate = (preProdRuleV, prodRuleV, scheduledDate) => {
  cron.schedule(scheduledDate, () => {
    console.log(`Updating rule at ${new Date().toISOString()}`);
    updateRule(preProdRuleV, prodRuleV);
  });
};
