import Legal, { Section } from '../Legal'
import { PATHS, SUPPORT_EMAIL } from '../launch'

export default function Privacy() {
  return (
    <Legal
      title="Privacy Policy"
      eyebrow="Legal"
      description="How Pantry collects, uses, and stores personal information for the app and this website."
    >
      <p>
        Pantry is a grocery app operated from Australia. This policy explains what
        personal information we collect, why we collect it, and the choices you
        have. It covers the Pantry iOS app and this website, including the
        waitlist.
      </p>
      <p>
        We handle personal information in line with the Privacy Act 1988 (Cth) and
        the Australian Privacy Principles. If something here does not match what
        you see in the product, this policy is the version to rely on — and you
        can always ask us.
      </p>

      <Section title="Who we are">
        <p>
          When this policy says “we”, “us”, or “Pantry”, it means the operator of
          the Pantry app and website. Questions about privacy go to{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </Section>

      <Section title="Information we collect">
        <p>Depending on how you use Pantry, we may collect:</p>
        <ul>
          <li>
            <strong>Account details</strong> — email address, display name, and
            sign-in identifiers from Apple or other sign-in providers you choose.
          </li>
          <li>
            <strong>Household details</strong> — household name, who is in it, and
            the pantry you share, if you use Pro.
          </li>
          <li>
            <strong>Pantry contents</strong> — items, quantities, storage location,
            prices, and expiry dates, whether they came from a scanned receipt or
            you typed them in.
          </li>
          <li>
            <strong>Receipt images</strong> — photos you take or upload so we can
            read the grocery list. We use these to extract items; we are not
            building a photo album of your shopping.
          </li>
          <li>
            <strong>Meal and notification preferences</strong> — the meals you
            generate, digest settings, and whether you allow push notifications.
          </li>
          <li>
            <strong>Waitlist details</strong> — an email address if you join from
            this site before launch.
          </li>
          <li>
            <strong>Device and usage data</strong> — app version, device type,
            crash logs, and rough usage so we can keep the app working.
          </li>
          <li>
            <strong>Purchase records</strong> — whether a household is on Free or
            Pro. Apple processes the payment itself; we do not see your full card
            number.
          </li>
        </ul>
      </Section>

      <Section title="How we use it">
        <p>We use this information to:</p>
        <ul>
          <li>run the app — track what you have, when it expires, and what to cook</li>
          <li>read receipts you scan and suggest meals from what is turning</li>
          <li>send the morning digest and, on Pro, afternoon meal nudges</li>
          <li>share one pantry with the people in your household, if you invite them</li>
          <li>process Pro subscriptions through the App Store</li>
          <li>email waitlist members when we launch</li>
          <li>fix bugs, prevent abuse, and improve how well scanning and meals work</li>
          <li>answer support requests</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </Section>

      <Section title="Camera, photos, and notifications">
        <p>
          Receipt scanning needs camera or photo-library access on your device. You
          can refuse that permission and still add items by hand. Images are sent
          to our systems and service providers so we can extract the grocery list;
          we keep them only as long as we need to provide the feature, fix errors,
          and improve accuracy.
        </p>
        <p>
          Push notifications are optional. You can turn them off in iOS Settings
          at any time. The morning digest and Pro afternoon nudges only go out if
          notifications are on.
        </p>
      </Section>

      <Section title="Household sharing">
        <p>
          If you create or join a household, other members can see the shared
          pantry — items, expiry dates, and related activity. Do not invite someone
          unless you are comfortable with them seeing that list. You can leave a
          household, and a household owner can remove members.
        </p>
      </Section>

      <Section title="Who else sees it">
        <p>
          We use service providers to host the app, store data, send emails, read
          receipts, generate meal ideas, and understand crashes. They only get what
          they need to do that job, under contracts that require them to protect
          it.
        </p>
        <p>
          Apple processes App Store purchases and, if you use Sign in with Apple,
          that sign-in. Apple’s terms and privacy policy apply to that part.
        </p>
        <p>
          We may disclose information if the law requires it, or if we need to
          protect Pantry, our users, or other people’s rights.
        </p>
      </Section>

      <Section title="Storage, security, and overseas disclosure">
        <p>
          We store information on secure servers, which may be in Australia or
          overseas (including where our hosting and AI providers operate). When
          information leaves Australia, we take steps that are reasonable in the
          circumstances to make sure it is protected in a way that is consistent
          with the Australian Privacy Principles.
        </p>
        <p>
          No method of transmission over the internet is perfectly secure. We work
          to protect your information; we cannot promise that unauthorised access
          will never happen.
        </p>
      </Section>

      <Section title="How long we keep it">
        <p>
          We keep account and pantry data while your account is open, and for a
          short period after you delete it so we can finish deletions and handle
          disputes. Waitlist emails are kept until we have launched (or you ask us
          to remove you). Receipt images and logs are kept only as long as they
          are useful for the purposes above. We may keep anonymised or aggregated
          figures that no longer identify you.
        </p>
      </Section>

      <Section title="Your rights">
        <p>You can:</p>
        <ul>
          <li>ask what personal information we hold about you</li>
          <li>ask us to correct it if it is wrong</li>
          <li>ask us to delete your account and associated personal information</li>
          <li>opt out of waitlist emails by contacting us</li>
          <li>withdraw camera, photo, or notification permissions on your device</li>
        </ul>
        <p>
          To access, correct, or delete your information, email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the address
          on your account, or use the in-app account controls where they exist. We
          may need to confirm it is you before we act. There is more on account
          deletion on the <a href={PATHS.support}>support page</a>.
        </p>
        <p>
          If you are not satisfied with how we handle a privacy complaint, you can
          contact the Office of the Australian Information Commissioner at{' '}
          <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">
            oaic.gov.au
          </a>
          .
        </p>
      </Section>

      <Section title="Children">
        <p>
          Pantry is not directed at children under 13, and we do not knowingly
          collect personal information from them. If you believe a child under 13
          has an account, tell us and we will delete it.
        </p>
      </Section>

      <Section title="This website">
        <p>
          The marketing site may use essential cookies or similar storage so pages
          load correctly. If you join the waitlist, we store the email you submit
          so we can tell you when Pantry is live. That list is not used for
          unrelated marketing.
        </p>
      </Section>

      <Section title="Changes">
        <p>
          We may update this policy. The date at the top is the latest version. If
          a change is material, we will say so in the app or by email where we
          can. Keeping using Pantry after an update means you accept the revised
          policy.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Privacy questions, access requests, and complaints:{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
        <p>
          See also our <a href={PATHS.terms}>Terms of Service</a> and{' '}
          <a href={PATHS.support}>Support</a> page.
        </p>
      </Section>
    </Legal>
  )
}
