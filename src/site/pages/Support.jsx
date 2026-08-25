import { CreditCard, Mail, Shield, Trash2 } from 'lucide-react'
import Legal, { Section } from '../Legal'
import { PATHS, SUPPORT_EMAIL } from '../launch'

const cards = [
  {
    icon: Mail,
    title: 'Email us',
    body: (
      <>
        The fastest way to reach a person.{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
      </>
    ),
  },
  {
    icon: CreditCard,
    title: 'Subscriptions',
    body: 'Pro is billed by Apple. Cancelling, changing plan and refunds all happen in your Apple ID settings, because we genuinely cannot do it from our side.',
  },
  {
    icon: Trash2,
    title: 'Delete your account',
    body: 'Use the in-app account controls, or email us from the address on the account and ask us to delete it.',
  },
  {
    icon: Shield,
    title: 'Privacy requests',
    body: (
      <>
        Access, correction, and deletion are covered in the{' '}
        <a href={PATHS.privacy}>privacy policy</a>. Email us and we will take it
        from there.
      </>
    ),
  },
]

export default function Support() {
  return (
    <Legal
      title="Support"
      eyebrow="Help"
      description="Get help with Pantry: contact, subscriptions, account deletion, and common questions."
    >
      <p>
        Stuck on a scan, a household invite, or a Pro subscription? Start here.
        We read every email. We are a small Australian team, so you will get a
        person, not a ticket maze.
      </p>

      <div className="support-grid">
        {cards.map(({ icon: Icon, title, body }) => (
          <article className="support-card" key={title}>
            <span className="support-card__icon" aria-hidden="true">
              <Icon size={18} strokeWidth={2.25} />
            </span>
            <div>
              <h2 className="support-card__title">{title}</h2>
              <p className="support-card__body">{body}</p>
            </div>
          </article>
        ))}
      </div>

      <Section title="How to get help">
        <p>
          Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the
          address on your Pantry account and include:
        </p>
        <ul>
          <li>what you were trying to do</li>
          <li>what happened instead</li>
          <li>your device and iOS version, if it is an app issue</li>
          <li>a screenshot, if it helps (cover anything you would rather keep private)</li>
        </ul>
        <p>
          We aim to reply within two business days, Monday to Friday, Australian
          Eastern Time. Launch weeks and public holidays can stretch that a little.
        </p>
      </Section>

      <Section title="Common questions">
        <p>
          A longer list lives on the homepage, but these are the ones that usually
          come in:
        </p>
        <ul>
          <li>
            <strong>Scanning missed an item.</strong> Edit it in the review step
            and save. Receipts are messy; the model gets better when you correct
            it.
          </li>
          <li>
            <strong>Expiry looks wrong.</strong> Change the date on the item.
            Shelf life is a starting point, not a lab result.
          </li>
          <li>
            <strong>Household invite did not arrive.</strong> Ask them to check
            junk, and confirm you used the address they sign in with. Email us if
            it still fails.
          </li>
          <li>
            <strong>Pro is not unlocking.</strong> Make sure you are signed into
            the same Apple ID you used to subscribe, then restore purchases in
            the app.
          </li>
        </ul>
        <p>
          More answers are in the <a href="/#faq">FAQ</a> on the homepage.
        </p>
      </Section>

      <Section title="Manage or cancel Pro">
        <p>
          Pantry Pro is an auto-renewing App Store subscription (monthly or
          yearly, with a 7-day trial). To cancel or stop renewal:
        </p>
        <ol>
          <li>Open Settings on your iPhone</li>
          <li>Tap your name, then Subscriptions</li>
          <li>Choose Pantry and cancel</li>
        </ol>
        <p>
          Deleting the app does not cancel Pro. Refunds for App Store purchases
          are handled by Apple. Prices and renewal rules are in the{' '}
          <a href={PATHS.terms}>terms of service</a>.
        </p>
      </Section>

      <Section title="Delete your account and data">
        <p>
          You can delete your Pantry account from the app (Account or Settings,
          then delete), or by emailing{' '}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Delete%20my%20Pantry%20account`}>
            {SUPPORT_EMAIL}
          </a>{' '}
          with the subject “Delete my Pantry account”. We will confirm and remove
          personal information associated with the account, except anything we
          must keep for a legal reason. Household pantry data other members still
          need may remain for them.
        </p>
        <p>
          Cancelling Pro is separate from deleting the account. If you want both,
          cancel the subscription with Apple, then ask us to delete the account.
        </p>
      </Section>

      <Section title="Waitlist">
        <p>
          If you joined the waitlist on this site and want off it, email us from
          that address and say so. We will remove it. Launch mail is the only
          thing that list is for.
        </p>
      </Section>
    </Legal>
  )
}
