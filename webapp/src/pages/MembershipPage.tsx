import { CheckCircle2, WalletCards } from 'lucide-react';
import { useRestioo } from '../context/RestiooContext';
import { formatCurrency } from '../utils/format';

export function MembershipPage() {
  const { state, actions } = useRestioo();
  const currentPlan = state.membershipPlans.find((plan) => plan.id === state.currentUser?.membershipPlanId);

  return (
    <div className="page-stack">
      <section className="dashboard-hero membership-hero">
        <div>
          <p className="utility-label">Membership</p>
          <h2>{currentPlan?.name ?? 'Linh hoạt'}</h2>
          <p>{state.currentUser?.remainingMinutes ?? 0} phút sử dụng còn lại trong tài khoản.</p>
        </div>
        <WalletCards size={46} />
      </section>

      <section className="pricing-grid">
        {state.membershipPlans.map((plan) => {
          const isCurrent = plan.id === state.currentUser?.membershipPlanId;
          return (
            <article className={`pricing-card ${isCurrent ? 'selected' : ''}`} key={plan.id}>
              <h3>{plan.name}</h3>
              <strong>{plan.price > 0 ? formatCurrency(plan.price) : 'Theo nhu cầu'}</strong>
              <p>{plan.description}</p>
              <ul>
                {plan.benefits.map((benefit) => (
                  <li key={benefit}>
                    <CheckCircle2 size={15} /> {benefit}
                  </li>
                ))}
              </ul>
              <button className={isCurrent ? 'secondary-button full' : 'primary-button full'} type="button" onClick={() => actions.purchaseMembership(plan.id)}>
                {isCurrent ? 'Gói hiện tại' : 'Thanh toán thử nghiệm'}
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
}
