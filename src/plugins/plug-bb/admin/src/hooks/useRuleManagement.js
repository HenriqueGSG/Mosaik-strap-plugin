import { useState } from "react";
import { fetchRulesIdsAndNames, updateRule } from "../services/rules-api";

const useRuleManagement = () => {
  const [prodRule, setProdRule] = useState(null);
  const [preProdRules, setPreProdRules] = useState(null);
  const [selectedRule, setSelectedRule] = useState(null);
  const [productions, setProductions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // alterar A CHAMADA PARA A NOVA
  const fetchData = async () => {
    try {
      const data = await fetchRulesIdsAndNames();
      console.log(data, "INTERNAL");
      setProductions(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleUpdateRule = () => {
    updateRule(preProdRules, prodRule);
    // Additional logic if needed
  };
  // CHANGE HOW TO GET THE DATA
  const handleSelectChange = (selectedRuleOption) => {
    const selectedRuleOptionObj = JSON.parse(selectedRuleOption);
    setProdRule(selectedRuleOptionObj["production"]);
    setPreProdRules(selectedRuleOptionObj);
    setSelectedRule(selectedRuleOptionObj["name"]);
  };

  return {
    prodRule,
    preProdRules,
    selectedRule,
    productions,
    isLoading,
    fetchData,
    handleUpdateRule,
    handleSelectChange,
  };
};
export default useRuleManagement;
