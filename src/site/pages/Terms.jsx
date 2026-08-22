import Legal, { Section } from '../Legal'
import { PATHS, SUPPORT_EMAIL } from '../launch'

export default function Terms() {
  return (
    <Legal
      title="Terms of Service"
      eyebrow="Legal"
      description="The terms that apply when you use the Pantry app, website, and waitlist."
    >
      <p>
        These terms are an agreement between you and Pantry for the iOS app, this
        website, and the waitlist. By downloading the app, creating an account, or
        using the site, you agree to them. If you do not, do not use Pantry.
      </p>
      <p>
        Our <a href={PATHS.privacy}>Privacy Policy</a> explains how we handle
        personal information. Apple’s terms also apply to anything you buy through
        the App Store.
      </p>

      <Section title="The service">
        <p>
          Pantry helps you track groceries, expiry dates, and meal ideas from
          receipts you scan or items you add yourself. Features differ between the
          Free plan and Pantry Pro. We can change, pause, or withdraw features as
          we improve the product — we will not do that to dodge a commitment we
          have already made to you under Australian Consumer Law.
        </p>
        <p>
          Pantry is built first for Australian grocery receipts in English. We do
          not promise that scanning or shelf-life data will work the same way
          outside Australia.
        </p>
      </Section>

      <Section title="Accounts">
        <p>
          You must be at least 13 to use the app. You are responsible for the
          account you create, the people you invite into a household, and keeping
          your sign-in details to yourself. Tell us if you think someone else is
          using your account.
        </p>
        <p>
          Household members can see the shared pantry. Only invite people you
          trust with that list.
        </p>
      </Section>

      <Section title="Subscriptions and billing">
        <p>
          Pantry is free to download. Pantry Pro is an auto-renewing subscription
          sold through the Apple App Store:
        </p>
        <ul>
          <li>
            <strong>Pantry Pro (Monthly)</strong> — one month, currently A$4.99
          </li>
          <li>
            <strong>Pantry Pro (Yearly)</strong> — one year, currently A$49.99
          </li>
        </ul>
        <p>
          New Pro subscribers get a 7-day free trial. If you buy a subscription
          during a trial, any unused trial time is forfeited. Prices are in
          Australian dollars, may vary by storefront, and are shown in the app
          before you confirm.
        </p>
        <p>
          Payment is charged to your Apple ID at confirmation of purchase. The
          subscription renews automatically unless you cancel at least 24 hours
          before the end of the current period. Your account is charged for
          renewal within 24 hours prior to the end of the current period. Manage
          or cancel in your Apple ID account settings after purchase. Deleting
          the app does not cancel a subscription.
        </p>
        <p>
          One Pro subscription unlocks the household for everyone in it, up to
          the member limit shown in the app. We do not offer refunds directly for
          App Store purchases — those are handled by Apple under Apple’s refund
          rules. Nothing in these terms limits any refund or other right you have
          under Australian Consumer Law.
        </p>
      </Section>

      <Section title="Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>use Pantry for anything illegal</li>
          <li>try to break, overload, or reverse-engineer the service</li>
          <li>scan or upload content you do not have the right to use</li>
          <li>abuse receipt scanning or meal generation in a way that harms other users or our providers</li>
          <li>resell or misrepresent Pantry as your own product</li>
        </ul>
        <p>
          We can suspend or close an account that breaches these terms, after
          giving you a chance to respond where that is reasonable.
        </p>
      </Section>

      <Section title="Food, scanning, and AI">
        <p>
          Expiry dates are estimates based on a shelf-life database and Australian
          food-safety guidance. Receipt scanning is accurate most of the time, not
          all of the time. Meal ideas are suggestions generated with automated
          tools — they are not nutrition advice, medical advice, or a promise that
          a recipe is safe for you.
        </p>
        <p>
          You still decide what to keep, cook, or throw out. If food looks or
          smells wrong, do not eat it, whatever Pantry says. Check allergens
          yourself. Pantry is not a substitute for food-safety judgement or
          professional advice.
        </p>
      </Section>

      <Section title="Intellectual property">
        <p>
          Pantry, the app, this website, and our branding belong to us or our
          licensors. You get a personal, non-exclusive licence to use the app for
          its intended purpose. You keep whatever rights you have in the receipts
          and pantry data you submit; you give us a licence to use that material
          only to provide and improve the service.
        </p>
      </Section>

      <Section title="Availability">
        <p>
          We aim to keep Pantry up, but we do not guarantee uninterrupted access.
          Maintenance, outages, App Store issues, or changes at our providers can
          get in the way. Features that depend on camera, network, or third-party
          models may fail when those things fail.
        </p>
      </Section>

      <Section title="Liability">
        <p>
          Nothing in these terms excludes, restricts, or modifies any consumer
          guarantee, right, or remedy you have under the Australian Consumer Law
          or other laws that cannot be excluded.
        </p>
        <p>
          Where we are allowed to limit our liability for a failure to comply with
          a consumer guarantee in relation to services, we limit it to supplying
          the services again or paying the cost of having them supplied again.
        </p>
        <p>
          To the extent permitted by law, we are not liable for loss of profits,
          loss of data, or indirect or consequential loss, or for food that is
          eaten, wasted, or thrown out based on information in the app.
        </p>
      </Section>

      <Section title="Ending the agreement">
        <p>
          You can stop using Pantry and delete your account at any time. We can
          stop providing the service or close accounts as set out above. Sections
          that reasonably should survive — including intellectual property,
          liability, and governing law — continue after the agreement ends.
        </p>
      </Section>

      <Section title="Changes">
        <p>
          We may update these terms. The date at the top is the latest version.
          If a change is material, we will give notice in the app or by email
          where we can. If you keep using Pantry after the change takes effect,
          you accept the new terms. If you do not, stop using the app and delete
          your account.
        </p>
      </Section>

      <Section title="Governing law">
        <p>
          These terms are governed by the laws of Australia. If a dispute cannot
          be resolved with us directly, the courts of Australia have jurisdiction,
          without limiting any rights you have as a consumer in your state or
          territory.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about these terms:{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Help with the
          app is on the <a href={PATHS.support}>support page</a>.
        </p>
      </Section>
    </Legal>
  )
}
