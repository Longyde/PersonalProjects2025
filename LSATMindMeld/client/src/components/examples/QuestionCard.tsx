import { QuestionCard } from "../QuestionCard";

export default function QuestionCardExample() {
  return (
    <div className="p-6 max-w-3xl">
      <QuestionCard
        question="Which one of the following, if true, most strengthens the argument that regular exercise improves cognitive function?"
        options={[
          "Many people who exercise regularly report feeling more mentally alert",
          "Studies show that sedentary individuals have higher rates of cognitive decline",
          "Exercise increases blood flow to the brain, delivering more oxygen and nutrients",
          "Athletes tend to perform better on certain cognitive tests than non-athletes",
        ]}
        correctAnswer={2}
        explanation="Option C provides the most direct causal mechanism linking exercise to cognitive improvement. It explains HOW exercise affects the brain (increased blood flow, oxygen, and nutrients), which directly supports cognitive function. The other options show correlations but don't explain the mechanism."
        xpReward={25}
        onAnswer={(correct) => console.log("Answer:", correct)}
      />
    </div>
  );
}
