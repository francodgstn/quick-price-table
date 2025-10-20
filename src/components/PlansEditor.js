import React from 'react';
import { Plus } from 'lucide-react';
import PlanEditor from './PlanEditor';

export default function PlansEditor({
  plans,
  setPlans,
  styles,
  collapsedPlans,
  togglePlanCollapse,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  updatePlan,
  removePlan,
  setFeatured,
  addFeature,
  updateFeature,
  removeFeature
}) {
  const addPlan = () => {
    if (plans.length >= 4) return;
    const newPlan = {
      id: Date.now(),
      name: 'New Plan',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Plan description',
      features: [],
      buttonText: 'Get Started',
      buttonLink: '',
      embedCode: '',
      useEmbed: false,
      monthly: {
        buttonText: 'Get Started',
        buttonLink: '',
        embedCode: '',
        useEmbed: false,
        openInNewTab: true,
        promotionalText: '',
        showEquivalentPrice: true,
        equivalentTemplate: ''
      },
      yearly: {
        buttonText: 'Get Started',
        buttonLink: '',
        embedCode: '',
        useEmbed: false,
        openInNewTab: true,
        promotionalText: '',
        showEquivalentPrice: true,
        equivalentTemplate: ''
      },
      isFeatured: false
    };
    setPlans([...plans, newPlan]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold" style={{ color: styles.textColor }}>Plans</h3>
        {plans.length < 4 && (
          <button
            onClick={addPlan}
            className="px-3 py-1 rounded flex items-center gap-1 text-sm"
            style={{ backgroundColor: styles.primaryColor, color: 'white' }}
          >
            <Plus size={16} /> Add Plan
          </button>
        )}
      </div>

      <div className="space-y-4">
        {plans.map((plan, idx) => (
          <PlanEditor
            key={plan.id}
            plan={plan}
            idx={idx}
            styles={styles}
            collapsedPlans={collapsedPlans}
            togglePlanCollapse={togglePlanCollapse}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragEnd={handleDragEnd}
            updatePlan={updatePlan}
            removePlan={removePlan}
            setFeatured={setFeatured}
            addFeature={addFeature}
            updateFeature={updateFeature}
            removeFeature={removeFeature}
            plansLength={plans.length}
          />
        ))}
      </div>
    </div>
  );
}
