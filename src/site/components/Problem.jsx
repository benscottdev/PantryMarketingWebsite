export default function Problem() {
  return (
    <section className="problem" data-problem>
      {/* <div className="problem__eyebrow eyebrow">THIS IS WHAT THE BIN CHARGES YOU</div>/ */}
      <div className="problem__counter" data-counter>
        $0
      </div>
      <div className="problem__copy">
        binned per Australian household, per year. <strong>7.6 million tonnes</strong> of food nationally, about{' '}
        <strong>$36.6 billion</strong>, and most of it was bought with good intentions.
      </div>
      {/* <div className="problem__stamp" data-stamp>
        ANNUAL BIN INVOICE
      </div> */}
      <div className="problem__source">SOURCE: END FOOD WASTE AUSTRALIA · NATIONAL FOOD WASTE STRATEGY</div>
    </section>
  );
}
