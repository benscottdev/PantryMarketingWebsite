import Legal, { Callout, Note, Section, Table } from '../Legal'
import { PATHS, SUPPORT_EMAIL } from '../launch'

const mailto = `mailto:${SUPPORT_EMAIL}`

export default function Privacy() {
  return (
    <Legal
      title="Privacy Policy"
      eyebrow="Legal"
      description="What personal information Pantry collects, why, who we share it with, how long we keep it, and what you can do about it."
    >
      <p>
        <strong>Version 1.0.</strong> Applies to the Pantry iOS app and the Pantry
        website.
      </p>
      <p>
        We are Benjamin James Linehan Scott (ABN 45 718 906 920), trading as Pantry
        and LSD Studios, Chatswood NSW 2067, Australia.
        Pantry is run by one person.
      </p>
      <p>
        This policy explains what personal information we collect, why we collect
        it, who we share it with, how long we keep it, and what you can do about
        it. It is our policy under Australian Privacy Principle 1.3. You can read
        it free of charge at any time, in the app and on this website.
      </p>
      <p>
        If anything here is unclear, email us at{' '}
        <a href={mailto}>{SUPPORT_EMAIL}</a> and we will explain it in plain terms.
      </p>

      <Section title="Quick summary">
        <p>This table is a summary only. The full policy below is what applies.</p>
        <Table head={['What we collect', 'Why', 'Who we share it with', 'How long we keep it']}>
          <tr>
            <td>Email address, password hash or Sign in with Apple ID</td>
            <td>To create and secure your account</td>
            <td>Supabase (hosting, Sydney), Apple (if you use Sign in with Apple)</td>
            <td>Until you delete your account</td>
          </tr>
          <tr>
            <td>Display name, avatar emoji</td>
            <td>To show who you are to other people in your household</td>
            <td>Supabase; other members of your household</td>
            <td>Until you delete your account</td>
          </tr>
          <tr>
            <td>
              Household size, shopping frequency, average weekly grocery spend, main
              goal, free-text “what’s stopping you”, waste-reduction target
            </td>
            <td>
              To size your meal suggestions, project your likely annual waste and
              savings, and shape onboarding
            </td>
            <td>Supabase; OpenAI/Anthropic (only where needed to generate meals)</td>
            <td>Until you delete your account or clear the field</td>
          </tr>
          <tr>
            <td>
              <strong>Allergies and diet style (sensitive health information)</strong>
            </td>
            <td>
              Only to steer and adapt meal suggestions — not a safety check
            </td>
            <td>Supabase; OpenAI/Anthropic (as meal-generation constraints)</td>
            <td>Until you clear it or delete your account</td>
          </tr>
          <tr>
            <td>Kitchen equipment you own</td>
            <td>To suggest meals you can actually cook</td>
            <td>Supabase; OpenAI/Anthropic</td>
            <td>Until you delete your account</td>
          </tr>
          <tr>
            <td>Receipt photos</td>
            <td>To read your receipt and turn it into pantry items</td>
            <td>
              Google Cloud Vision (OCR), OpenAI/Anthropic (parsing), Supabase Storage
              (Sydney)
            </td>
            <td>
              Deleted about 6 hours after processing. A capped set of failed or poorly
              parsed receipts is kept longer to fix parsing — see “Retaining failed
              receipt images”
            </td>
          </tr>
          <tr>
            <td>Parsed receipt data: shop, location, date, line items, prices, totals</td>
            <td>To build your pantry and track spend and waste</td>
            <td>Supabase; OpenAI/Anthropic; other members of your household</td>
            <td>Until you delete the item or your account</td>
          </tr>
          <tr>
            <td>
              Pantry items, storage zones, opened/eaten/binned events, money saved or
              wasted, streaks, shopping lists
            </td>
            <td>To run the core features and your stats</td>
            <td>Supabase; other members of your household</td>
            <td>Until you delete them or your account</td>
          </tr>
          <tr>
            <td>Corrections you make to item names</td>
            <td>To fix your item, and to improve parsing for everyone</td>
            <td>Supabase; shared item catalogue</td>
            <td>Indefinitely in the shared catalogue, in de-identified form</td>
          </tr>
          <tr>
            <td>Generated meals and your thumbs up/down</td>
            <td>
              To save meals and improve future suggestions{' '}
              <strong>for your own household only</strong>
            </td>
            <td>Supabase; OpenAI/Anthropic; your household</td>
            <td>Until you delete them or your account</td>
          </tr>
          <tr>
            <td>Push token, app version, device presence</td>
            <td>To send notifications and support the app</td>
            <td>Expo/EAS; Supabase</td>
            <td>Until you delete your account or turn off notifications</td>
          </tr>
          <tr>
            <td>IP address, server logs, crash data</td>
            <td>Security, abuse prevention, debugging</td>
            <td>Supabase; Expo</td>
            <td>Server logs 30 days; crash reports 90 days</td>
          </tr>
          <tr>
            <td>Bug reports you send</td>
            <td>To fix problems you report</td>
            <td>Slack</td>
            <td>12 months, or until the bug is closed, whichever is sooner</td>
          </tr>
          <tr>
            <td>Subscription status (not card details)</td>
            <td>To unlock Pro features</td>
            <td>RevenueCat, Apple</td>
            <td>Until you delete your account; billing records stay with Apple</td>
          </tr>
          <tr>
            <td>Waitlist email on our website</td>
            <td>To tell you when we launch</td>
            <td>Supabase</td>
            <td>Until you unsubscribe, or 12 months after you join the waitlist</td>
          </tr>
        </Table>
        <p>
          <strong>
            Our core database and file storage are hosted in Sydney, Australia.
          </strong>{' '}
          Some processing — reading receipts, generating meals, sending
          notifications and managing subscriptions — is still done by overseas
          providers. “Sending information overseas” lists every one of them.
        </p>
        <p>
          <strong>We never receive your card or payment details.</strong> Apple
          handles all billing.
        </p>
        <p>
          <strong>We do not sell your personal information.</strong>
        </p>
      </Section>

      <Section title="1. Who we are and how to contact us">
        <p>
          Pantry is operated by Benjamin James Linehan Scott, ABN 45 718 906 920, of
          Chatswood NSW 2067, Australia.
        </p>
        <p>
          For anything about privacy — questions, access requests, corrections,
          complaints — email <a href={mailto}>{SUPPORT_EMAIL}</a>. Email is the
          fastest way to reach us and the only channel we monitor for privacy
          requests.
        </p>
        <p>
          We are a one-person business. We aim to reply to privacy requests within
          30 days, and usually faster.
        </p>
      </Section>

      <Section title="2. When this policy applies">
        <p>
          This policy applies to personal information we collect through the Pantry
          iOS app, the Pantry website, and when you email us.
        </p>
        <p>
          It does not apply to Apple, or to any other company’s own handling of your
          information under their own policies. Where we name a third party in this
          policy, we link to their policy so you can read it.
        </p>
        <p>
          <strong>
            We comply with this policy in full, regardless of whether the small
            business exemption in section 6D of the Privacy Act 1988 (Cth) would
            otherwise apply to a business our size.
          </strong>{' '}
          We have chosen not to rely on that exemption. Every commitment in this
          policy — including the consent, access, correction, breach-notification and
          complaint-handling commitments — applies to Pantry as a matter of our own
          undertaking, not only where the law happens to require it.
        </p>
      </Section>

      <Section title="3. How we manage privacy">
        <p>We handle privacy in an open and transparent way. Concretely, that means:</p>
        <ul>
          <li>
            This policy is published in the app and on our website, free, with no
            login required.
          </li>
          <li>
            We give you a short collection notice at onboarding and at your first
            receipt scan, before we collect.
          </li>
          <li>
            Every database query is scoped to your account or your household using
            Postgres row-level security. This is enforced at the database, not just
            in the app.
          </li>
          <li>
            Administrative tables deny all access by default. Only a server-side
            function holding a service role key can reach them.
          </li>
          <li>
            Any staff access to a user record goes through an internal console that
            checks a server-side allowlist on every request and writes an audit log
            entry.
          </li>
          <li>
            We keep a written list of every third party that receives personal
            information, what they receive, and why. It is reproduced under “Sending
            information overseas”.
          </li>
          <li>
            We review this policy at least once a year, and whenever we add a feature
            that changes what we collect or who we send it to.
          </li>
          <li>We keep a data breach response plan and follow it.</li>
        </ul>
        <p>
          Privacy complaints come to <a href={mailto}>{SUPPORT_EMAIL}</a> and are
          handled under “Complaints”.
        </p>
      </Section>

      <Section title="4. Using Pantry anonymously or under a pseudonym">
        <p>
          You have the option of dealing with us anonymously or by pseudonym where
          that is lawful and practicable.
        </p>
        <p>
          <strong>You can browse our website anonymously.</strong> You do not need an
          account to read the site.
        </p>
        <p>
          <strong>You cannot use the app anonymously.</strong> Pantry syncs your
          pantry across devices, shares it with your household, and gives you a paid
          subscription tier. All three need an account tied to a verifiable
          identifier, so we can tell your data from someone else’s and restore it if
          you change phones. Anonymous use is not practicable for those functions.
        </p>
        <p>
          <strong>You can use a pseudonym.</strong> Your display name is shown to
          your household and can be anything you like — it does not have to be your
          real name. We never verify it.
        </p>
        <p>
          <strong>You can reduce what we know about you</strong> by using Sign in
          with Apple and choosing to hide your email. Apple gives us a private relay
          address instead of your real one. We can still email you; we just do not
          see your address.
        </p>
      </Section>

      <Section title="5. What personal information we collect, and why">
        <p>
          We only collect what we reasonably need to run Pantry. Each item below has
          a stated purpose. If we cannot state a purpose, we should not be collecting
          it.
        </p>

        <h3>Account information</h3>
        <Table head={['We collect', 'Why']}>
          <tr>
            <td>Email address</td>
            <td>
              To identify your account, let you sign in, reset your password, and
              send account and expiry notifications
            </td>
          </tr>
          <tr>
            <td>Password hash (if you use email sign-in)</td>
            <td>
              To authenticate you. We never store your actual password, only a
              one-way hash created by Supabase Auth
            </td>
          </tr>
          <tr>
            <td>Sign in with Apple identifier, which may be a private relay email</td>
            <td>To authenticate you without us holding a password</td>
          </tr>
          <tr>
            <td>Display name</td>
            <td>To show other household members who added or used an item</td>
          </tr>
          <tr>
            <td>Avatar emoji</td>
            <td>To distinguish members visually in a shared household</td>
          </tr>
        </Table>

        <h3>Onboarding profile</h3>
        <p>
          We ask these questions once, at setup. You can change or clear any of them
          later in Settings.
        </p>
        <Table head={['We collect', 'Why we need it']}>
          <tr>
            <td>Household size (number of people)</td>
            <td>
              To scale meal portions and quantity suggestions. Without it, meals are
              sized for the wrong number of people
            </td>
          </tr>
          <tr>
            <td>Shopping frequency</td>
            <td>
              To time expiry warnings and the weekly recap around your actual shop
            </td>
          </tr>
          <tr>
            <td>Average weekly grocery spend</td>
            <td>
              To project how much you’re likely to waste over a year and how much
              your waste-reduction goal could save you
            </td>
          </tr>
          <tr>
            <td>Main goal (cut waste / save money / cook more / stay organised)</td>
            <td>
              To decide which stat we show first on your home screen and what your
              notifications emphasise
            </td>
          </tr>
          <tr>
            <td>Free-text “what’s getting in the way”</td>
            <td>
              To help us understand common blockers and improve onboarding and meal
              suggestions. This field is optional
            </td>
          </tr>
          <tr>
            <td>Diet style (vegetarian, vegan, pescatarian, none)</td>
            <td>To steer meal suggestions</td>
          </tr>
          <tr>
            <td>Kitchen equipment you own</td>
            <td>
              To avoid suggesting meals you cannot cook — no air fryer recipes
              without an air fryer
            </td>
          </tr>
          <tr>
            <td>Food-waste reduction target</td>
            <td>To set the goal your stats are measured against</td>
          </tr>
        </Table>

        <h3>Allergy information — sensitive information</h3>
        <p>
          We ask whether you have allergies, from a list (gluten, dairy, nuts, soy,
          shellfish, eggs, sesame, fish), plus an optional free-text “other allergy”
          field, and we record when you gave consent.
        </p>
        <p>
          <strong>
            Allergy information is health information, and health information is
            “sensitive information” under the Privacy Act.
          </strong>{' '}
          It gets extra protection. Specifically:
        </p>
        <ul>
          <li>
            We only collect it <strong>with your consent.</strong> You are shown a
            consent step before you answer, and asked to tick a box. Declining is a
            valid choice and does not block you from using the app — it clears any
            allergy data already entered and lets you continue.
          </li>
          <li>
            We use it for <strong>one purpose only: to steer and adapt meal
              suggestions.</strong> It is passed to the meal generator as a constraint.
            It is not used for marketing, not used for analytics, and not shared with
            your household beyond what is necessary to generate meals for a shared
            household.
          </li>
          <li>
            <strong>You can clear it at any time</strong> in Settings → Preferences.
            When you clear it, we delete it from your profile, along with the record
            of your consent; it is not archived.
          </li>
          <li>
            We do not require it. If you do not give it to us, your allergies will
            not influence your meal suggestions at all.
          </li>
        </ul>
        <Callout title="This steers your suggestions — it is not a safety screen">
          <p>
            Whether you give us your allergies or not,{' '}
            <strong>you need to check every ingredient yourself, every time.</strong>{' '}
            Clause 9 of our <a href={PATHS.terms}>Terms of Service</a> explains why.
          </p>
        </Callout>
        <p>
          <strong>A warning about the free-text field.</strong> The “other allergy”
          box and the “what’s getting in the way” box are open text. You could type
          more than we asked for — a medical condition, a diagnosis, a medication, or
          details about someone else in your home. Please do not. Enter only the name
          of the allergen. Anything you do type into those fields is treated as
          sensitive information and handled the same way. If you tell us you have
          entered something you did not mean to, email us and we will delete it.
        </p>
        <p>
          Diet style (vegetarian, vegan, pescatarian) is not automatically sensitive
          information, but it can reveal religious or philosophical belief. We treat
          it the same way as allergy data: consent-based, used only to steer meals,
          clearable, never used for marketing.
        </p>

        <h3>Receipt scans</h3>
        <p>
          When you scan a receipt, we take the photo from your camera or photo
          library and upload it to Supabase Storage. It is then sent to Google Cloud
          Vision to read the text, and the text is sent to our AI provider to turn
          into structured items.
        </p>
        <p>
          <strong>A receipt contains more than groceries.</strong> It may include the
          shop name and location, the date and time you shopped, every line item and
          price, the total, a loyalty number, the last four digits of a card, and any
          other purchase on the same docket — including things you did not intend to
          tell us about.
        </p>
        <p>We minimise this in three ways:</p>
        <ul>
          <li>
            We only extract the fields we need: item name, quantity, price, date, and
            merchant.
          </li>
          <li>
            We delete the receipt image approximately 6 hours after processing, with
            one exception set out below.
          </li>
          <li>
            You can crop the photo before uploading, and you can delete any parsed
            item at the review step before it is saved.
          </li>
        </ul>
        <p>
          You do not have to scan receipts. You can add pantry items manually.
        </p>

        <h3>Pantry and usage data</h3>
        <p>We collect, and attribute to the individual user who did it:</p>
        <ul>
          <li>
            Every item added, its category, storage zone (fridge, freezer, pantry),
            price and purchase date
          </li>
          <li>When an item was opened</li>
          <li>Whether an item was eaten or thrown out</li>
          <li>Money saved and money wasted events</li>
          <li>Scan streaks</li>
          <li>Shopping list contents</li>
          <li>Meals generated and saved, and your thumbs up or down on them</li>
          <li>Corrections you make to a parsed item name</li>
        </ul>
        <p>
          We collect this to run the core features: your inventory, expiry warnings,
          waste statistics, and meal suggestions.{' '}
          <strong>
            Note that “who binned it” is recorded and visible to your household.
          </strong>
        </p>

        <h3>Device and technical information</h3>
        <ul>
          <li>Your Expo push notification token, so we can send you notifications</li>
          <li>Device and client presence (whether the app is open)</li>
          <li>App version, for support and debugging</li>
          <li>IP address and standard server logs, for security and abuse prevention</li>
          <li>Error and crash context</li>
        </ul>

        <h3>Support and bug reports</h3>
        <p>
          If you file an in-app bug report, we collect the category, your free-text
          description, and technical context. Bug reports are relayed to a private
          Slack workspace that only we can access, because that is how a one-person
          business gets alerted to a problem.
        </p>
        <p>
          Please do not include personal information about yourself or anyone else in
          a bug report beyond what is needed to describe the problem.
        </p>

        <h3>Subscription information</h3>
        <p>
          If you subscribe to Pro, Apple processes the purchase. RevenueCat manages
          your entitlement and sends us a webhook telling us your subscription
          status, product, and renewal or expiry date.
        </p>
        <p>
          <strong>
            We never see or store your card number, bank details, or billing address.
          </strong>{' '}
          Apple holds all of that. All refunds are requested from Apple, not from us.
        </p>

        <h3>Waitlist</h3>
        <p>
          If you gave us your email on our pre-launch waitlist, we hold that email to
          tell you when we launch. “Our website, cookies and the waitlist” explains
          how to get off the list.
        </p>

        <h3>Fields we do not collect</h3>
        <p>
          We do not ask for your date of birth, address, phone number, gender,
          location (beyond what a receipt happens to print), photos other than
          receipts, contacts, or health information other than allergies.
        </p>
      </Section>

      <Section title="6. How we collect it">
        <ul>
          <li>
            <strong>Directly from you</strong>, wherever we reasonably can — you type
            it in, or you take the photo.
          </li>
          <li>
            <strong>From Apple</strong>, if you use Sign in with Apple: an identifier
            and either your email or a private relay address.
          </li>
          <li>
            <strong>From RevenueCat and Apple</strong>, your subscription status.
          </li>
          <li>
            <strong>Automatically from your device</strong>, the technical
            information listed above.
          </li>
        </ul>
        <p>
          <strong>Indirectly, from another person.</strong> This is important and we
          want to be plain about it:
        </p>
        <ul>
          <li>
            If someone invites you to a household, they enter something to identify
            you — typically an invite they send you, and a display name in the
            household.
          </li>
          <li>
            Once you are in a household, other members’ actions create records about
            you: an item they add is visible to you, and an item you add is visible
            to them, attributed to you by name.
          </li>
          <li>
            If a receipt someone else scans includes items for the whole household,
            that data lands in the shared household even though you did not scan it.
          </li>
        </ul>
        <p>
          Where we collect information about you from someone else rather than from
          you, we cannot always give you a collection notice at that moment. We give
          it to you as soon as practicable — when you first open the app, or when you
          accept the household invite.
        </p>
        <p>
          We collect only by lawful and fair means. We do not buy personal
          information, scrape it, or obtain it by deception.
        </p>
      </Section>

      <Section title="7. Information we did not ask for">
        <p>
          Sometimes we end up holding information we did not solicit. The two
          realistic cases are a receipt image that contains information beyond
          groceries — a loyalty number, partial card digits, a pharmacy line item,
          another person’s purchase — and a bug report or email in which you tell us
          something we did not ask for.
        </p>
        <p>
          When that happens, we assess whether we could have collected that
          information under APP 3 — that is, whether it is reasonably necessary for a
          function of Pantry.
        </p>
        <p>
          If it is not, and it is lawful and reasonable to do so, we destroy it or
          de-identify it as soon as practicable. In practice this means: the receipt
          image is deleted on the normal ~6 hour cycle, the parsed data set is
          limited to the fields we need, and unsolicited detail in a bug report is
          deleted from Slack when the bug is closed.
        </p>
        <p>
          If we decide we could have collected it, we treat it under the rest of this
          policy as if you had given it to us.
        </p>
      </Section>

      <Section title="8. What we tell you when we collect">
        <p>
          At or before the time we collect your personal information — or as soon as
          practicable afterwards — we tell you the things APP 5 requires: who we are
          and how to contact us; that we are collecting, and from where; why; what
          happens if you do not provide it; who we usually disclose it to; that this
          policy explains access, correction and complaints; and that we send
          information overseas, and to which countries.
        </p>
        <p>We do that through:</p>
        <ul>
          <li>The short in-app notice at onboarding and at your first scan</li>
          <li>The consent step at the allergy step</li>
          <li>This policy, linked from both</li>
        </ul>
        <p>
          No Australian law requires us to collect any of this information. We
          collect it because Pantry does not work without it.
        </p>
      </Section>

      <Section title="9. How we use and disclose your information">
        <h3>Primary purposes</h3>
        <p>We use your information to:</p>
        <ul>
          <li>Create, secure and run your account</li>
          <li>Read your receipts and build your pantry inventory</li>
          <li>Estimate expiry dates and warn you before food goes off</li>
          <li>
            Generate meal suggestions from what you have, taking account of your
            diet, allergies and equipment
          </li>
          <li>Track and show you your waste, spend and savings statistics</li>
          <li>Run shared households and shopping lists</li>
          <li>Send you the notifications you have turned on</li>
          <li>Manage your Free or Pro entitlement</li>
          <li>Respond to your bug reports and support emails</li>
          <li>
            Keep the service secure, prevent abuse, and enforce our{' '}
            <a href={PATHS.terms}>Terms of Service</a>
          </li>
          <li>Comply with the law</li>
        </ul>

        <h3>Who we disclose to, and why</h3>
        <p>
          We disclose personal information to the service providers listed under
          “Sending information overseas”, for the purposes listed there. We do not
          disclose it to anyone else except:
        </p>
        <ul>
          <li>With your consent</li>
          <li>
            Where required or authorised by Australian law, or by a court or tribunal
            order
          </li>
          <li>
            Where we reasonably believe it is necessary to lessen or prevent a
            serious threat to someone’s life, health or safety
          </li>
          <li>
            To our professional advisers (accountant, lawyer) under confidentiality,
            if needed
          </li>
          <li>
            If we sell or transfer the business, to the buyer — in which case we will
            tell you before your information is transferred, and this policy
            continues to apply until the buyer publishes its own
          </li>
        </ul>

        <h3>Retaining failed receipt images to improve parsing — this needs your consent</h3>
        <p>Most receipt images are deleted about 6 hours after processing.</p>
        <p>
          <strong>There is an exception.</strong> Where a scan fails, or parses badly,
          we keep a capped number of those images for longer, as a test set. We use
          them to work out why parsing failed and to check that changes actually fix
          it. This is a <strong>secondary purpose</strong> — it is not why you gave us
          the receipt.
        </p>
        <p>
          Because a receipt image can contain sensitive or unexpected information,{' '}
          <strong>
            we treat this as requiring your consent, not as something you would simply
            expect.
          </strong>{' '}
          We ask you at onboarding.
        </p>
        <p>
          <strong>You can opt out at any time</strong> in Settings → Privacy → “Help
          improve receipt scanning”. Turning it off means:
        </p>
        <ul>
          <li>No further failed scans of yours are retained</li>
          <li>
            Any of your images currently in the test set are deleted within{' '}
            <strong>7 days</strong>
          </li>
          <li>Your scans still work exactly the same way</li>
        </ul>
        <p>
          Retained images are kept for no longer than <strong>12 months</strong>, and
          the set is capped at <strong>500 images</strong>. They are stored in the
          same Supabase Storage bucket with the same access controls, and only we can
          view them. We do not use these images to train an AI model of our own, and
          we do not send them to any AI vendor for that vendor to train on.
        </p>

        <h3>Item-name corrections and meal feedback</h3>
        <p>
          When you correct a parsed item name — for example, changing “COLES SM MLK
          2L” to “Milk” — we use the correction twice: once to fix your item, and
          once to improve a <strong>shared catalogue of known items</strong> that
          makes parsing better for everyone.
        </p>
        <p>
          The shared catalogue stores the raw receipt text and the corrected name. It
          does not store your user ID, your household, the date, the price, or
          anything else linking the entry to you. It is de-identified before it
          enters the catalogue.
        </p>
        <p>
          <strong>
            Your thumbs up or down on a generated meal is aggregated only within your
            own household
          </strong>{' '}
          — into a rolling record of what your household tends to like — and used only
          to tune the meal suggestions your household sees in future. It is never
          aggregated across other households, and it does not leave your household’s
          data to improve suggestions for anyone else.
        </p>
        <p>
          Both of these are secondary purposes. We disclose them here so that they are
          not a surprise. If you do not want your corrections in the shared catalogue,
          email us and we will exclude your account.
        </p>

        <h3>AI vendors and model training</h3>
        <p>
          Pantry sends data to third-party AI services to do its job: Google Cloud
          Vision reads the text on your receipt. Receipt parsing and meal generation
          are then handled by either OpenAI or Anthropic — we run both as
          interchangeable backends and can switch which one is doing the work at any
          time, without an app update, to manage cost, quality and reliability.
          Whichever is active receives the same categories of data for that function:
          receipt text and pantry item names for parsing; diet, allergy and equipment
          constraints for meal generation.
        </p>
        <p>
          We want to be precise here rather than reassuring, because a vague promise
          on this point would be worse than none. What we have configured:
        </p>
        <ul>
          <li>
            We use these services through their paid business or API tiers, not their
            consumer products. The terms that apply to those tiers are different from
            — and stricter than — the terms that apply to a consumer chatbot account.
          </li>
          <li>
            On those tiers, the published position of each vendor is that data sent
            through the API is <strong>not used to train their models by default</strong>,
            and we have not opted in to any data-sharing or model-improvement
            programme.
          </li>
          <li>
            Each vendor still retains data briefly for abuse monitoring and to deliver
            the service. Published defaults are in the order of a few hours to 30
            days, depending on the vendor and the endpoint.
          </li>
        </ul>
        <p>
          We have not independently audited these vendors and we cannot verify their
          internal practices. What we can tell you is which tier we use, that we have
          not opted in to training, and where to read each vendor’s own terms.
        </p>
        <p>
          We last checked this against each vendor’s published API terms on 22 August
          2026. We re-check at least annually and before any change to which provider
          handles a given function.
        </p>

        <h3>We do not sell your information</h3>
        <p>
          We do not sell, rent, or trade your personal information. We do not run
          advertising in Pantry and we do not share your data with advertisers or
          data brokers.
        </p>
      </Section>

      <Section title="10. Household sharing">
        <p>
          A household is a shared space.{' '}
          <strong>
            Joining one is a disclosure of your information to the other people in it.
          </strong>{' '}
          Be deliberate about who you join.
        </p>
        <p>
          <strong>What other members can see:</strong>
        </p>
        <ul>
          <li>Every pantry item you added, including its price and purchase date</li>
          <li>
            What you opened, ate, or threw out — attributed to you by display name
          </li>
          <li>The shared shopping list</li>
          <li>The household’s saved meals and statistics</li>
          <li>Your display name and avatar emoji</li>
        </ul>
        <p>
          <strong>What other members cannot see:</strong> your email address, your
          allergies, your diet style, your onboarding answers, your subscription
          status, or your original receipt images.
        </p>
        <p>
          <strong>Invite codes.</strong> Households are joined by invite code. Codes
          expire. Do not post one publicly — anyone with a live code can join and see
          everything above.
        </p>
        <p>
          <strong>When you leave a household.</strong> You take a copy of the items
          you personally added. <strong>The household keeps its copy.</strong> Data
          you contributed continues to exist in that household after you leave,
          because the household’s inventory, spend history and waste statistics depend
          on it. We cannot retroactively unwind it without corrupting other members’
          records.
        </p>
        <p>
          <strong>If a household’s Pro subscription lapses.</strong> Sharing a
          household requires Pro. If Pro is not restored within 3 days of lapsing,
          every member other than the household’s owner is automatically moved back to
          their own individual household — the same “you take a copy, the household
          keeps its copy” principle applies.
        </p>
        <p>
          <strong>When you delete your account.</strong> Your personal profile,
          allergies, receipts and account records are deleted.{' '}
          <strong>
            Household-scoped records that other members still rely on may remain
          </strong>{' '}
          — in de-identified form, or attributed to a removed user. We are telling you
          this rather than promising total erasure, because total erasure is not what
          happens.
        </p>
        <p>
          If you want your contributed records removed from a household as well, email
          us. We will do it where it is technically possible without destroying other
          members’ data, and we will tell you plainly if it is not.
        </p>
        <p>
          <strong>
            If you own a household with other members in it, you must transfer
            ownership before you can delete your account.
          </strong>{' '}
          See clause 15.2 of our <a href={PATHS.terms}>Terms of Service</a>.
        </p>
      </Section>

      <Section title="11. Automated processing and AI">
        <p>
          Pantry uses automated processing in three places: reading your receipt
          (OCR), turning the text into items (AI), and generating meal suggestions
          (AI). Expiry dates are estimated automatically from general food-shelf-life
          data.
        </p>
        <p>
          <strong>
            None of this makes a decision about your legal rights or interests.
          </strong>{' '}
          We do not use automated processing to decide whether you get an account,
          what you are charged, whether you get credit, or anything else with legal
          effect. The outputs are suggestions and estimates you review and can
          override.
        </p>
        <p>
          We are telling you about it anyway, because you should know when a machine —
          not a person — has produced something you are looking at. From 10 December
          2026, Australian privacy law will require certain automated decision-making
          to be disclosed in privacy policies. We have assessed Pantry against that
          requirement and our view is that no Pantry automation is a “substantially
          automated decision that significantly affects an individual’s rights or
          interests”. If that changes — for example if we automate account suspension
          — we will update this section before the feature ships.
        </p>
        <p>
          Automated output is often wrong. “Keeping information accurate” explains
          what we do about that and how you correct it.
        </p>
      </Section>

      <Section title="12. Direct marketing and notifications">
        <p>
          <strong>Service notifications</strong> are the ones you turn on in Settings:
          daily digest, urgent expiry alerts, meal suggestions, and the weekly recap.
          These are part of the product. You control which ones you get and the time
          windows they arrive in, in Settings → Notifications.
        </p>
        <p>
          <strong>Marketing messages</strong> are different. Occasionally we may send
          a push notification or email about a new feature, a Pro offer, or app news.
        </p>
        <p>
          <strong>You can opt out of marketing at any time.</strong> It is free, and
          it always will be.
        </p>
        <ul>
          <li>In-app: Settings → Notifications → turn off “Product news and offers”</li>
          <li>Email: click unsubscribe at the bottom of any marketing email</li>
          <li>
            Or email <a href={mailto}>{SUPPORT_EMAIL}</a> with “unsubscribe” in the
            subject
          </li>
        </ul>
        <p>
          We action opt-outs within <strong>5 business days</strong> and in any event
          within a reasonable period. You will still receive service notifications you
          have turned on, and essential account messages such as password resets and
          subscription changes — those are not marketing.
        </p>
        <p>
          <strong>We never use sensitive information for marketing.</strong> Your
          allergies and diet style do not drive any marketing message, segment, or
          offer. They are used only to steer meals.
        </p>
        <p>
          Marketing emails identify us and include a working unsubscribe, as required
          by the Spam Act 2003 (Cth). If you ask us to tell you where we got your
          contact details, we will.
        </p>
      </Section>

      <Section title="13. Sending information overseas">
        <p>
          <strong>
            Our core database and file storage are hosted in Sydney, Australia.
          </strong>{' '}
          Your account, profile, allergies, receipts, pantry data, meals and logs live
          there, in Supabase’s <code>ap-southeast-2</code> region.
        </p>
        <p>
          <strong>Some processing is still done overseas.</strong> Reading receipt
          text, generating meals, delivering push notifications and managing your
          subscription are handled by providers based in the United States. Here is
          every overseas recipient, what they get, and why.
        </p>
        <Table head={['Recipient', 'What they receive', 'Purpose', 'Country']}>
          <tr>
            <td>
              <strong>Google Cloud Vision</strong>
            </td>
            <td>Receipt images</td>
            <td>Reading text off receipts (OCR)</td>
            <td>United States</td>
          </tr>
          <tr>
            <td>
              <strong>OpenAI / Anthropic</strong>
            </td>
            <td>
              Receipt text; pantry item names; diet, allergy and equipment constraints
            </td>
            <td>
              Parsing receipts into items; generating meals — we run both as
              interchangeable backends
            </td>
            <td>United States</td>
          </tr>
          <tr>
            <td>
              <strong>Expo / EAS</strong>
            </td>
            <td>Push tokens, notification content, crash context</td>
            <td>Delivering push notifications, building the app</td>
            <td>United States</td>
          </tr>
          <tr>
            <td>
              <strong>RevenueCat</strong>
            </td>
            <td>App user ID, subscription status</td>
            <td>Managing your Pro entitlement</td>
            <td>United States</td>
          </tr>
          <tr>
            <td>
              <strong>Apple</strong>
            </td>
            <td>Sign in with Apple identifier, all payment and billing data</td>
            <td>App distribution, sign-in, all payment processing</td>
            <td>United States and globally</td>
          </tr>
          <tr>
            <td>
              <strong>Slack</strong>
            </td>
            <td>Bug report text and category, and whatever you include in it</td>
            <td>Relaying bug reports and operational alerts to us</td>
            <td>United States</td>
          </tr>
        </Table>
        <p>
          <strong>What we do about it.</strong> Before we send your information
          overseas, we take reasonable steps to make sure the recipient does not
          breach the Australian Privacy Principles. In practice, for a business our
          size, that means:
        </p>
        <ul>
          <li>
            Using established vendors that publish data processing terms, and
            accepting those terms rather than sending data to a provider with none
          </li>
          <li>
            Using paid business or API tiers, not consumer tiers, so that business
            data terms apply
          </li>
          <li>Not opting in to any model-training or data-sharing programme</li>
          <li>
            Sending the minimum data each vendor needs — receipt text rather than the
            account it came from, allergen tags rather than free-text medical detail
          </li>
          <li>
            Reviewing each vendor’s terms at least annually and before any change to
            the pipeline
          </li>
        </ul>
        <p>
          <strong>We remain responsible.</strong> Under section 16C of the Privacy
          Act, if an overseas recipient we have disclosed your information to does
          something with it that would breach the Australian Privacy Principles,{' '}
          <strong>
            we are treated as having done it ourselves, and you can complain to us and
            to the OAIC about it.
          </strong>{' '}
          We do not disclaim that responsibility. This applies to our Sydney-hosted
          infrastructure just as it does to every overseas recipient in the table
          above. We do not rely on any exception in APP 8.2 to avoid taking these
          steps.
        </p>
        <p>
          Information handled in the United States may be accessible to US authorities
          under US law, including in ways that Australian law would not permit. We
          cannot prevent that. If that is unacceptable to you, please do not use
          Pantry.
        </p>
      </Section>

      <Section title="14. Government identifiers">
        <p>
          We do not collect, use, disclose or adopt any government related identifier.
          We do not want your Medicare number, tax file number, driver licence number,
          passport number, or Centrelink CRN, and we have no field for any of them.
        </p>
        <p>
          <strong>Please do not type any of these into a free-text field</strong>,
          including a bug report or the “other allergy” box. If you do, we will delete
          it as soon as we notice.
        </p>
      </Section>

      <Section title="15. Keeping information accurate">
        <p>
          We take reasonable steps to make sure the information we collect is
          accurate, up to date and complete, and that anything we use or disclose is
          accurate, up to date, complete and relevant to what we are using it for.
        </p>
        <p>
          <strong>We need to be honest about a limitation.</strong> OCR and AI parsing
          get things wrong. A receipt line can be misread, a price can be transposed,
          and an item can be categorised incorrectly. Expiry dates are{' '}
          <strong>
            estimates generated from general food-shelf-life data, not measurements and
            not food-safety determinations.
          </strong>
        </p>
        <p>That is why:</p>
        <ul>
          <li>
            Every scan goes through a <strong>review screen</strong> before anything is
            saved. Check it.
          </li>
          <li>
            You can edit any item — name, category, storage zone, price, purchase date,
            expiry — at any time.
          </li>
          <li>You can delete any item.</li>
          <li>
            Correcting a parsed name also helps improve parsing for everyone.
          </li>
        </ul>
        <p>
          Your profile fields are all editable in Settings. If we hold something about
          you that is wrong and you cannot fix it yourself, “Correcting your
          information” explains how we will.
        </p>
      </Section>

      <Section title="16. Security">
        <p>
          We take reasonable steps to protect your information from misuse,
          interference, loss, and unauthorised access, modification or disclosure.
          Concretely:
        </p>
        <ul>
          <li>
            <strong>In transit:</strong> all traffic between the app, our servers and
            third-party services uses TLS.
          </li>
          <li>
            <strong>At rest:</strong> the database and file storage are encrypted at
            rest by our hosting provider.
          </li>
          <li>
            <strong>Row-level security:</strong> every table has Postgres row-level
            security policies that scope each query to your user account or your
            household. A query for someone else’s data returns nothing — this is
            enforced by the database, not by app code.
          </li>
          <li>
            <strong>Admin tables deny by default:</strong> administrative tables have
            deny-all policies. Only a service role key can read them.
          </li>
          <li>
            <strong>The service role key is held in a server-side function only.</strong>{' '}
            It is never in the app bundle, never in client code, and never in the
            browser.
          </li>
          <li>
            <strong>Admin access is allowlisted and audited:</strong> every request to
            the internal console checks a server-side allowlist, and every access is
            written to an audit log.
          </li>
          <li>
            <strong>CORS origins are pinned</strong> to our own domains.
          </li>
          <li>
            <strong>Invite codes expire</strong> and can be revoked by the household
            owner.
          </li>
          <li>
            <strong>Rate limiting</strong> applies to scans, meal generation and
            authentication, to blunt automated abuse.
          </li>
          <li>
            <strong>Passwords are never stored.</strong> Supabase Auth stores a one-way
            hash.
          </li>
          <li>
            <strong>We never hold card data.</strong> Apple does.
          </li>
        </ul>
        <p>
          <strong>What we cannot promise.</strong> No system is completely secure. We
          do not offer end-to-end encryption — we can technically read your pantry
          data, because the server has to process it to generate meals and expiry
          warnings. Anyone who tells you a cloud app with server-side AI features is
          end-to-end encrypted is wrong, and we are not going to tell you that.
        </p>
        <p>
          You are responsible for your own account security: use a strong, unique
          password or Sign in with Apple, and do not share your login or invite codes.
        </p>
      </Section>

      <Section title="17. How long we keep information, and when we destroy it">
        <p>
          We destroy or de-identify personal information when we no longer need it for
          any purpose set out in this policy, unless we are required by law to keep
          it.
        </p>
        <Table head={['Information', 'Retention']}>
          <tr>
            <td>Receipt images (normal)</td>
            <td>Deleted approximately 6 hours after processing</td>
          </tr>
          <tr>
            <td>Receipt images retained to improve parsing</td>
            <td>
              Capped at 500 images; deleted no later than 12 months; deleted within 7
              days if you opt out
            </td>
          </tr>
          <tr>
            <td>Account, profile, allergies, pantry, meals, statistics</td>
            <td>
              Until you delete your account, subject to what survives in a shared
              household
            </td>
          </tr>
          <tr>
            <td>Item-name corrections in the shared catalogue</td>
            <td>Kept indefinitely in de-identified form</td>
          </tr>
          <tr>
            <td>Push tokens</td>
            <td>Until you delete your account or disable notifications</td>
          </tr>
          <tr>
            <td>Server logs and IP addresses</td>
            <td>30 days</td>
          </tr>
          <tr>
            <td>Crash and error reports</td>
            <td>90 days</td>
          </tr>
          <tr>
            <td>Bug reports in Slack</td>
            <td>12 months, or until the bug is closed, whichever is sooner</td>
          </tr>
          <tr>
            <td>Subscription status records</td>
            <td>Until you delete your account</td>
          </tr>
          <tr>
            <td>Records we must keep for tax and accounting</td>
            <td>5 years, as required by Australian tax law</td>
          </tr>
          <tr>
            <td>Database backups</td>
            <td>
              Rolling 7 days. Deleted data may persist in a backup until the backup
              rolls off
            </td>
          </tr>
          <tr>
            <td>Waitlist emails</td>
            <td>Until you unsubscribe, or 12 months after you join the waitlist</td>
          </tr>
          <tr>
            <td>Privacy requests and complaints</td>
            <td>3 years, so we can show we handled them</td>
          </tr>
        </Table>
        <p>
          <strong>Backups.</strong> When you delete something, it is removed from the
          live database immediately, but a copy may remain in an encrypted backup for
          up to 7 days. We do not restore individual records from backups to bring
          deleted data back.
        </p>
      </Section>

      <Section title="18. Data breaches">
        <p>
          If we suspect an eligible data breach — unauthorised access to, disclosure
          of, or loss of personal information — we will:
        </p>
        <ul>
          <li>Contain it immediately</li>
          <li>
            Assess it, and complete that assessment <strong>within 30 days</strong> of
            becoming aware
          </li>
          <li>
            If we conclude it is likely to result in serious harm to you,{' '}
            <strong>
              notify you and the Office of the Australian Information Commissioner as
              soon as practicable
            </strong>
            , telling you what happened, what information was involved, and what you
            should do about it
          </li>
        </ul>
        <p>
          We follow this process regardless of whether the Notifiable Data Breaches
          scheme technically binds a business of our size. If you think there has been
          a breach, tell us at <a href={mailto}>{SUPPORT_EMAIL}</a>.
        </p>
      </Section>

      <Section title="19. Accessing your information">
        <p>
          You can ask us for access to the personal information we hold about you.
          Email <a href={mailto}>{SUPPORT_EMAIL}</a>.
        </p>
        <p>
          <strong>Most of it is already in the app.</strong> Your pantry, items, meals,
          shopping list, statistics and profile are all visible and editable in Pantry.
          Look there first — it is faster than waiting for us.
        </p>
        <p>
          If you want a copy of everything, including things not visible in the app:
        </p>
        <ul>
          <li>
            We will respond <strong>within 30 days</strong>
          </li>
          <li>
            <strong>There is no charge for making a request.</strong> If giving you
            access involves real work — compiling records, producing an export — we may
            charge a small amount to cover it. Any charge will not be excessive, and we
            will tell you what it is and why <strong>before</strong> we do the work, so
            you can decide
          </li>
          <li>
            We will give it to you in the way you ask if it is reasonable and
            practicable — usually a JSON or CSV export by email
          </li>
        </ul>
        <p>
          We need to be reasonably satisfied you are who you say you are before we hand
          anything over. Usually that means requesting from the email address on the
          account.
        </p>
        <p>
          <strong>When we can refuse.</strong> We may refuse access where the Privacy
          Act allows it — for example where giving access would have an unreasonable
          impact on another person’s privacy (which is a live issue in a shared
          household), where the request is frivolous or vexatious, where it relates to
          anticipated legal proceedings, or where giving access would be unlawful.
        </p>
        <p>
          If we refuse, we will give you <strong>written reasons</strong>, tell you how
          to complain, and — where it would meet your needs — offer to give you the
          information in another way, or through a mutually agreed intermediary such as
          a professional adviser.
        </p>
      </Section>

      <Section title="20. Correcting your information">
        <p>
          If information we hold about you is inaccurate, out of date, incomplete,
          irrelevant or misleading, we will correct it.
        </p>
        <p>
          <strong>Most corrections you can make yourself</strong> — edit the item, edit
          your profile, clear your allergies.
        </p>
        <p>
          For anything else, email <a href={mailto}>{SUPPORT_EMAIL}</a>. We will
          respond <strong>within 30 days</strong>, charge you nothing, correct it if we
          agree it is wrong, and correct it on our own initiative if we notice it
          ourselves.
        </p>
        <p>
          <strong>
            If we have already given the incorrect information to someone else
          </strong>{' '}
          — a service provider listed above — and you ask us to, we will tell them
          about the correction, unless it is impracticable or unlawful.
        </p>
        <p>
          <strong>If we refuse to correct something</strong>, we will give you written
          reasons and tell you how to complain. If you ask, we will{' '}
          <strong>attach a statement to the record</strong> saying that you believe it
          is inaccurate, out of date, incomplete, irrelevant or misleading, and we will
          take reasonable steps to make that statement apparent to anyone who looks at
          the record.
        </p>
      </Section>

      <Section title="21. Deleting your account">
        <p>
          You can delete your account yourself:{' '}
          <strong>Settings → Account → Delete account.</strong> This runs a full
          cascade and removes your profile, allergies, receipts, pantry items, meals,
          shopping lists, statistics and push tokens. You can also email{' '}
          <a href={mailto}>{SUPPORT_EMAIL}</a> and we will action it for you. There is
          more on the <a href={PATHS.support}>support page</a>.
        </p>
        <p>
          <strong>
            One limitation, stated plainly: if you are the owner of a shared household
            that still has other members in it, you must transfer ownership to another
            member before you can delete your account.
          </strong>{' '}
          This is because deleting the owner would break the household for everyone
          else. If you cannot reach the other members, email us and we will sort it out
          manually.
        </p>
        <p>
          <strong>What survives deletion:</strong>
        </p>
        <ul>
          <li>Household-scoped records other members rely on</li>
          <li>De-identified entries in the shared item catalogue</li>
          <li>Copies in encrypted backups, until the backup rolls off</li>
          <li>Records we must keep for tax, accounting or legal reasons</li>
          <li>
            Your Apple subscription and billing history, which is held by Apple, not us
          </li>
        </ul>
        <Callout title="Deleting your account does not cancel your subscription">
          <p>
            Cancel through your Apple ID subscription settings before deleting, or you
            will keep being billed. We cannot cancel it for you.
          </p>
        </Callout>
      </Section>

      <Section title="22. Complaints">
        <p>
          <strong>Step 1 — tell us.</strong> Email <a href={mailto}>{SUPPORT_EMAIL}</a>{' '}
          with “Privacy complaint” in the subject and describe what happened. We will
          acknowledge you within 5 business days, investigate and respond{' '}
          <strong>within 30 days</strong>, and tell you what we found, what we are doing
          about it, and why.
        </p>
        <p>
          <strong>Step 2 — escalate.</strong> If we have not resolved it within 30 days,
          or you are not satisfied with our response, you can complain to the Office of
          the Australian Information Commissioner:
        </p>
        <ul>
          <li>
            Website:{' '}
            <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">
              oaic.gov.au
            </a>
          </li>
          <li>Phone: 1300 363 992</li>
          <li>Post: GPO Box 5218, Sydney NSW 2001</li>
        </ul>
        <p>The OAIC will usually expect you to have complained to us first.</p>
      </Section>

      <Section title="23. Children and young people">
        <p>
          <strong>The minimum age to use Pantry is 16.</strong> By creating an account
          you confirm you are at least that age — you’re asked to tick a box to that
          effect when you sign up.
        </p>
        <p>
          Pantry is designed for people who do their own grocery shopping. It is not
          directed at children. We ask, and rely on the checkbox representation you give
          us at sign-up. We do not independently verify age beyond that.
        </p>
        <p>
          <strong>Consent and capacity.</strong> Under the Privacy Act, consent is only
          valid if the person has capacity to give it. OAIC guidance generally treats a
          person aged 15 or over as capable of giving their own consent, assessed case by
          case. Our 16-year minimum sits above that guidance.
        </p>
        <p>
          If we learn we hold personal information about someone below our minimum age,
          we will delete it. If you are a parent or guardian and believe this has
          happened, email <a href={mailto}>{SUPPORT_EMAIL}</a>.
        </p>
        <p>
          The OAIC’s Children’s Online Privacy Code is due by December 2026. We will
          review this section against the final Code when it is registered, and again
          before any feature aimed at younger users.
        </p>
      </Section>

      <Section title="24. Our website, cookies and the waitlist">
        <p>
          <strong>You can read our website without giving us anything.</strong>
        </p>
        <p>
          <strong>Cookies and analytics.</strong> Our website runs no analytics tooling
          and sets no non-essential cookies. If that changes, we will update this section
          and, where the law requires it, ask for your consent before any non-essential
          cookie is set.
        </p>
        <p>
          <strong>The waitlist.</strong> If you gave us your email address before launch,
          we hold it only to tell you when Pantry is available and to send launch-related
          updates.
        </p>
        <ul>
          <li>Every waitlist email includes an unsubscribe link</li>
          <li>
            Or email <a href={mailto}>{SUPPORT_EMAIL}</a> with “unsubscribe”
          </li>
          <li>
            We delete your address from the waitlist when you unsubscribe, and in any
            event <strong>12 months after you joined it</strong>
          </li>
          <li>
            A waitlist email is not an account. Being on the waitlist does not create one
          </li>
        </ul>
      </Section>

      <Section title="25. Changes to this policy">
        <p>
          We will update this policy when what we do changes. The version number and
          effective date at the top will change with it.
        </p>
        <p>
          <strong>For minor changes</strong> — clarifications, typos, a new sub-processor
          doing the same job as an old one — we will update the policy and the effective
          date.
        </p>
        <p>
          <strong>For significant changes</strong> — a new purpose, a new category of
          information, a new overseas recipient, or a change to how we handle sensitive
          information — we will tell you in the app before the change takes effect, and
          where the change requires your consent, we will ask for it.
        </p>
        <p>
          The current version is always available in the app and at{' '}
          <a href={PATHS.privacy}>usepantry.com.au/privacy</a>.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          <strong>Benjamin James Linehan Scott</strong> (ABN 45 718 906 920) trading as
          Pantry / LSD Studios
          <br />
          Chatswood NSW 2067, Australia
          <br />
          Privacy and support: <a href={mailto}>{SUPPORT_EMAIL}</a>
        </p>
        <p>
          See also our <a href={PATHS.terms}>Terms of Service</a> and{' '}
          <a href={PATHS.support}>Support</a> page.
        </p>
      </Section>

      <Section title="Appendix A — In-app collection notice">
        <p>
          Shown at onboarding, and again at your first receipt scan.
        </p>
        <Note>
          <p>
            <strong>
              Pantry is run by Benjamin James Linehan Scott (ABN 45 718 906 920) in
              Australia.
            </strong>{' '}
            Questions: <a href={mailto}>{SUPPORT_EMAIL}</a>.
          </p>
          <p>
            <strong>What we collect from you:</strong> your email, your answers to the
            setup questions, your receipt photos, and everything you add to your pantry.
            If you join a household, other members can see the items you add and what you
            throw out, under your display name. Some of your information may also reach us
            from other members of your household rather than from you.
          </p>
          <p>
            <strong>Why:</strong> to read your receipts, warn you before food goes off, and
            suggest meals. Without it, the app cannot do those things.
          </p>
          <p>
            <strong>Who we send it to:</strong> Supabase (hosting — Sydney, Australia),
            Google and our AI provider (reading receipts and generating meals — US-based),
            Expo (notifications), RevenueCat and Apple (subscriptions), Slack (bug
            reports). Most processing is in the United States; your core data is stored in
            Australia. We stay responsible for what every recipient does with it.
          </p>
          <p>
            <strong>
              Receipt photos are deleted about 6 hours after scanning.
            </strong>{' '}
            If a scan fails, we’d like to keep that image to fix our parsing. You can say
            no now, or turn it off any time in Settings.
          </p>
        </Note>
      </Section>

      <Section title="Appendix B — Allergy consent wording">
        <p>Shown at the allergy step, above the multi-select.</p>
        <Note>
          <p>
            <strong>
              Allergy information is health information, so we only collect it if you say
              yes.
            </strong>{' '}
            We use it for one thing: steering your meal suggestions away from those
            allergens.{' '}
            <strong>It is not a safety check — always read the ingredients yourself.</strong>{' '}
            We never use it for marketing, and you can clear it any time in Settings.
            Skipping this is fine.
          </p>
          <p>
            Immediately below the “other allergy” free-text field: enter the allergen only.
            Please don’t include medical conditions, diagnoses or medications.
          </p>
        </Note>
      </Section>
    </Legal>
  )
}
