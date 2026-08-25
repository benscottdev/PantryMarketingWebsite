import Legal, { Callout, Section } from '../Legal'
import { PATHS, SUPPORT_EMAIL } from '../launch'

const mailto = `mailto:${SUPPORT_EMAIL}`

export default function Terms() {
  return (
    <Legal
      title="Terms of Service"
      eyebrow="Legal"
      description="The terms that apply when you use the Pantry app, website, and waitlist."
    >
      <p>
        <strong>Version 1.0.</strong> These terms are an agreement between you and{' '}
        <strong>Benjamin James Linehan Scott</strong> (ABN 45 718 906 920), trading as
        Pantry and LSD Studios, Chatswood NSW 2067, Australia. In
        these terms, “we”, “us” and “our” mean that entity. “You” means you.
      </p>

      <Callout title="⚠️ Read clause 9 before you rely on anything in this app">
        <p>
          <strong>
            Pantry uses AI to read receipts, estimate expiry dates and suggest meals. All
            three get things wrong.
          </strong>
        </p>
        <ul>
          <li>
            Meal suggestions are AI-generated and{' '}
            <strong>
              may include ingredients that conflict with the allergies or diet you
              recorded.
            </strong>
          </li>
          <li>
            Expiry dates are{' '}
            <strong>
              estimates from general food data — not measurements, and not food-safety
              advice. Where the packet and Pantry disagree, the packet is right.
            </strong>
          </li>
          <li>Nothing in Pantry is medical, nutritional, dietary or allergy advice.</li>
        </ul>
        <p>
          <strong>
            If you or anyone you cook for has a food allergy or a medical condition, check
            every ingredient yourself, every time.
          </strong>{' '}
          Do not use Pantry as your allergen safety check. Clause 9 sets this out in full.
          Clause 8 explains the consumer rights that we cannot and do not exclude.
        </p>
      </Callout>

      <Section title="1. Accepting these terms">
        <p>
          By downloading, installing, creating an account on, or using Pantry, you agree
          to these terms. If you do not agree, do not use Pantry.
        </p>
        <p>
          These terms and our <a href={PATHS.privacy}>Privacy Policy</a> together form the
          agreement between us.
        </p>
      </Section>

      <Section title="2. Who can use Pantry">
        <p>
          You must be at least <strong>16 years old</strong> to use Pantry. By using
          Pantry, you confirm that:
        </p>
        <ul>
          <li>You are at least that age</li>
          <li>You have the legal capacity to enter into a binding contract</li>
          <li>You are not barred from using Pantry under any applicable law</li>
          <li>The information you give us is accurate</li>
        </ul>
        <p>
          At sign-up, you confirm your age by checking a box alongside your agreement to
          these terms. We do not independently verify age beyond that representation. If
          you are under 16, you must not create an account.
        </p>
        <p>
          Pantry is designed for personal, household use. It is not licensed for
          commercial food handling, food service, or any business that has food safety
          obligations.
        </p>
      </Section>

      <Section title="3. Your licence to use the app">
        <p>
          We grant you a{' '}
          <strong>
            limited, personal, non-exclusive, non-transferable, revocable licence
          </strong>{' '}
          to install and use Pantry on Apple devices you own or control, for your own
          personal, non-commercial use, in accordance with these terms and Apple’s App
          Store Terms of Service.
        </p>
        <p>
          This is a licence, not a sale. We keep ownership of the app. You must not
          sublicense, rent, lease, lend, sell, redistribute or transfer the app or your
          account.
        </p>
      </Section>

      <Section title="4. Your account">
        <p>
          You need an account to use Pantry. You can create one with an email address and
          password, or with Sign in with Apple. You agree to:
        </p>
        <ul>
          <li>Give accurate information when you sign up, and keep it current</li>
          <li>Keep your login credentials secure and not share them</li>
          <li>Be responsible for everything that happens under your account</li>
          <li>
            Tell us promptly at <a href={mailto}>{SUPPORT_EMAIL}</a> if you think your
            account has been compromised
          </li>
        </ul>
        <p>
          <strong>One account per person.</strong> Do not create multiple accounts to get
          around fair use limits or free-tier caps.
        </p>
        <p>
          <strong>You can be a member of one household at a time.</strong> To join a
          different household, you must leave your current one first. Clause 12.5 explains
          what happens when you leave.
        </p>
        <p>
          We may refuse to create, or may close, an account that breaches these terms.
        </p>
      </Section>

      <Section title="5. Free and Pro">
        <p>
          Pantry has a <strong>Free</strong> tier and a paid <strong>Pro</strong>{' '}
          subscription.
        </p>
        <p>
          The features and limits of each tier — including caps on receipt scans, meal
          generations, notification windows, and household sharing — are described in the
          app and may change. Where a change materially reduces what Pro gives you, clause
          14.4 applies.
        </p>
        <p>
          <strong>Sharing a household with other people requires Pro.</strong> If Pro
          lapses on a shared household, clause 6.8 explains what happens.
        </p>
      </Section>

      <Section title="6. Subscriptions, billing and refunds">
        <p>
          <strong>All Pro purchases are made through Apple.</strong> We do not process
          payments. We never see your card number, bank details, or billing address.
        </p>
        <p>When you subscribe, Apple charges the payment method on your Apple ID, payment is confirmed at purchase, and your Pro features unlock once Apple confirms the purchase to us through RevenueCat.</p>
        <p>
          <strong>Free trial.</strong> Pro includes a <strong>7-day free trial</strong> for
          new subscribers.{' '}
          <strong>
            If you do not cancel before the trial ends, Apple will charge you for the first
            subscription period.
          </strong>{' '}
          You can only use the trial once. If you have already had a trial, subscribing
          charges you immediately.
        </p>
        <p>
          <strong>Auto-renewal.</strong> Subscriptions renew automatically. Apple charges
          your payment method within 24 hours before the end of each period; a monthly
          subscription renews monthly and an annual subscription renews annually; renewal
          continues until you cancel.
        </p>
        <p>
          <strong>How to cancel.</strong> Cancel through{' '}
          <strong>your Apple ID subscription settings</strong> — on your iPhone: Settings →
          your name → Subscriptions → Pantry → Cancel Subscription.
        </p>
        <ul>
          <li>
            <strong>We cannot cancel your subscription for you.</strong> Only Apple can.
          </li>
          <li>
            Cancel at least 24 hours before the period ends, or Apple may charge you for
            the next one
          </li>
          <li>
            <strong>
              Cancellation takes effect at the end of the period you have already paid for.
            </strong>{' '}
            You keep Pro until then, and you are not charged again
          </li>
          <li>
            Deleting your Pantry account does <strong>not</strong> cancel your
            subscription. Cancel with Apple first
          </li>
        </ul>
        <p>
          <strong>Refunds.</strong> All Pro purchases are processed by Apple, so{' '}
          <strong>all refunds are requested from Apple</strong>, at reportaproblem.apple.com
          or through your Apple ID. Apple decides refund requests under its own policies.
        </p>
        <ul>
          <li>
            <strong>We cannot issue a refund for an Apple-processed purchase.</strong> We do
            not have the ability to, not just the willingness
          </li>
          <li>
            This does not affect your rights under clause 8. If you have a remedy under the
            Australian Consumer Law that Apple’s process does not deliver, contact us at{' '}
            <a href={mailto}>{SUPPORT_EMAIL}</a> and we will work out how to make it right
          </li>
        </ul>
        <p>
          <strong>Payment problems.</strong> If Apple cannot charge your payment method,
          your Pro features may be suspended until payment succeeds. Your data is not
          deleted — it reverts to Free tier limits.
        </p>
        <p>
          <strong>When Pro ends:</strong>
        </p>
        <ul>
          <li>
            Your account continues on the Free tier. Your pantry items, meals, history and
            statistics are not deleted.
          </li>
          <li>
            Pro-only features — higher scan and meal-generation caps, extra notification
            windows, and household sharing — become unavailable until you resubscribe.
          </li>
          <li>
            <strong>If you are in a shared household with other members</strong>, a{' '}
            <strong>3-day grace period</strong> starts when Pro lapses. If Pro is not
            restored within that window, every member other than the household’s owner is
            automatically moved back to their own individual household. Items already in
            the shared household are not deleted — they stay with the household. See clause
            12.5 and the household section of our{' '}
            <a href={PATHS.privacy}>Privacy Policy</a> for what that means for data.
          </li>
        </ul>
      </Section>

      <Section title="7. Price changes">
        <p>
          We may change subscription prices. If we increase the price of a subscription you
          already have,{' '}
          <strong>we will tell you at least 30 days before it takes effect</strong>, by
          in-app notice or email.
        </p>
        <p>
          A price increase applies from your next renewal after the notice period. If you do
          not want to pay it, cancel before then through Apple. Apple may also require its
          own consent step for a price increase. If Apple does not obtain your consent, your
          subscription may not renew.
        </p>
      </Section>

      <Section title="8. Your rights under the Australian Consumer Law">
        <p>
          <strong>
            This clause overrides everything else in these terms. If any other clause
            conflicts with it, this clause wins.
          </strong>
        </p>
        <p>
          Our services come with{' '}
          <strong>guarantees that cannot be excluded</strong> under the Australian Consumer
          Law (Schedule 2 to the <em>Competition and Consumer Act 2010</em> (Cth)). Among
          other things, services must be supplied with due care and skill, be fit for any
          purpose you told us about, and be supplied within a reasonable time.
        </p>
        <p>
          <strong>
            Nothing in these terms excludes, restricts or modifies any guarantee,
            condition, warranty, right or remedy that you have under the Australian
            Consumer Law or any other law that cannot lawfully be excluded, restricted or
            modified.
          </strong>
        </p>
        <p>
          If you are a consumer under the Australian Consumer Law, you may be entitled to a
          remedy for a major failure, and to compensation for any other reasonably
          foreseeable loss or damage.
        </p>
        <p>
          <strong>Where a right or remedy under the Australian Consumer Law can lawfully
            be limited</strong>, our liability for a failure to comply with a consumer
          guarantee is limited, at our option, to resupplying the services, or paying the
          cost of having the services resupplied.
        </p>
        <p>
          <strong>
            Every disclaimer and every limitation of liability in these terms — including
            clauses 9, 14, 18, 19 and 20 — is subject to this clause 8.
          </strong>{' '}
          We do not attempt to exclude liability for death or personal injury. We could not
          do so if we tried.
        </p>
        <p>
          Nothing in these terms stops you from making a complaint to a consumer protection
          agency or bringing proceedings in a court or tribunal that has jurisdiction.
        </p>
      </Section>

      <Section title="9. AI, food safety and allergens">
        <p>
          <strong>
            This is the most important clause in this document. Please read all of it.
          </strong>
        </p>
        <p>
          <strong>
            Pantry is a tool for reducing food waste. It is not a food safety system, and
            it is not an allergen screening tool.
          </strong>
        </p>
        <p>
          Pantry helps you keep track of food you already own and suggests things you might
          cook with it. That is all it does.{' '}
          <strong>
            If you need to know whether a food is safe for you to eat, Pantry is not the
            thing to ask.
          </strong>
        </p>
        <p>
          <strong>
            Receipt parsing, expiry estimates and meal suggestions are produced by automated
            systems, including third-party AI models. These systems are probabilistic.
          </strong>{' '}
          Their output varies between runs, can be confidently wrong, and is not reviewed by
          a person before you see it. Treat everything Pantry generates as a starting point
          to check, not an answer to act on.
        </p>

        <h3>9.2 Meal suggestions are AI-generated</h3>
        <p>
          Meals are generated by artificial intelligence from the items in your pantry and
          the preferences you recorded.
        </p>
        <p>
          <strong>AI makes mistakes.</strong> A suggested meal may contain errors,
          omissions, unsafe combinations, or{' '}
          <strong>
            ingredients that conflict with the allergies or dietary preferences you have
            recorded.
          </strong>
        </p>
        <p>
          <strong>
            Recording your allergies steers what Pantry suggests. It does not screen your
            meals for safety, and you must not use it as though it does.
          </strong>{' '}
          The steer can fail — because the AI ignores or misapplies it, because a receipt was
          parsed wrong, because an ingredient contains a hidden allergen, or because an item
          in your pantry is not what the app thinks it is.
        </p>
        <p>
          <strong>
            You must check every ingredient in every meal before you cook or eat it.
          </strong>
        </p>

        <h3>9.3 Expiry and shelf-life dates are estimates</h3>
        <p>
          Pantry estimates expiry dates from general food-shelf-life data and the purchase
          date on your receipt.
        </p>
        <p>
          <strong>
            These are estimates. They are not measurements, they are not based on the actual
            condition of your food, and they are not food safety advice.
          </strong>{' '}
          Real shelf life depends on the storage temperature, how the food was handled before
          you bought it, whether the packet has been opened, and many things the app cannot
          know.
        </p>
        <Callout title="The packet always wins">
          <p>
            Follow the use-by or best-before date printed on the packaging in preference to
            any date Pantry shows you. Where the two disagree, the packaging date is correct
            and the Pantry date is wrong.
          </p>
          <p>
            Also rely on food safety guidance from a competent authority, and on your own
            senses and judgement.{' '}
            <strong>
              If food looks, smells or tastes wrong, throw it out — no matter what the app
              says.
            </strong>{' '}
            Never eat something because Pantry says it is still good.
          </p>
        </Callout>

        <h3>9.4 Nothing here is professional advice</h3>
        <p>
          Pantry does not give medical, nutritional, dietary, allergy or food safety advice,
          and nothing in the app should be treated as any of those things.
        </p>
        <p>
          If you or anyone you cook for has a food allergy, an intolerance, coeliac disease,
          a medical condition, or is pregnant, immunocompromised, elderly or an infant:{' '}
          <strong>
            independently verify every ingredient and consult a qualified health
            professional.
          </strong>{' '}
          Pantry is not a substitute for reading the label.
        </p>

        <h3>9.5 Receipt parsing may be wrong</h3>
        <p>
          OCR and AI parsing may misread item names, quantities, prices and dates.{' '}
          <strong>A review screen is shown before anything is saved.</strong> You are
          responsible for checking it. Spend, savings and waste statistics are only as
          accurate as the data behind them.
        </p>

        <h3>9.6 What this clause does and does not do</h3>
        <p>
          This clause describes what Pantry can and cannot do, and tells you to verify things
          yourself. That instruction is a real one and we mean it.
        </p>
        <p>
          <strong>This clause is subject to clause 8.</strong> It does not, and cannot,
          exclude our liability for death or personal injury, or any other liability that
          cannot lawfully be excluded. If we fail to supply the service with due care and
          skill, clause 8 applies regardless of anything in this clause 9.
        </p>
      </Section>

      <Section title="10. Your content">
        <p>
          “Your content” means everything you put into Pantry: receipt images, pantry items,
          notes, corrections, shopping lists, bug reports and feedback.
        </p>
        <p>
          <strong>You own your content.</strong> We do not claim ownership of it.
        </p>
        <p>
          You grant us a{' '}
          <strong>non-exclusive, worldwide, royalty-free licence</strong> to host, store,
          copy, process, transmit, display and adapt your content{' '}
          <strong>only to the extent necessary to:</strong>
        </p>
        <ul>
          <li>Run Pantry and provide the features you use</li>
          <li>Sync your content across your devices and to your household</li>
          <li>
            Send it to the service providers listed in our{' '}
            <a href={PATHS.privacy}>Privacy Policy</a> so they can do their part
          </li>
          <li>
            Improve receipt parsing and meal suggestions, in the ways described in our
            Privacy Policy, subject to the consents and opt-outs described there
          </li>
          <li>Back up, secure and restore the service</li>
          <li>Comply with the law</li>
        </ul>
        <p>
          This licence ends when you delete the content or your account, except where content
          persists in a household you contributed to, in de-identified form in the shared
          item catalogue, in backups until they roll off, or where we must retain it by law.
        </p>
        <p>
          <strong>Feedback.</strong> If you send us suggestions for improving Pantry, we may
          use them without owing you anything. We are not obliged to use them or to keep them
          confidential.
        </p>
        <p>
          You are responsible for your content. You confirm you have the right to upload
          everything you upload.
        </p>
      </Section>

      <Section title="11. Acceptable use">
        <p>You must not:</p>
        <ul>
          <li>Use Pantry for anything unlawful, or to help anyone else do anything unlawful</li>
          <li>
            Upload content that is unlawful, defamatory, obscene, harassing, or infringes
            anyone’s rights
          </li>
          <li>
            <strong>Upload another person’s personal or financial documents</strong> — bank
            statements, medical records, identity documents, or anyone else’s receipts
            without their knowledge
          </li>
          <li>
            Reverse engineer, decompile, disassemble or attempt to derive the source code of
            Pantry, except where a law expressly permits it despite this restriction
          </li>
          <li>Scrape, crawl, or systematically extract data from Pantry</li>
          <li>
            Access Pantry by any automated means, or build a bot, script or client that
            interacts with our API
          </li>
          <li>
            Circumvent, disable or interfere with rate limits, security features, or usage
            caps
          </li>
          <li>Create multiple accounts to evade limits</li>
          <li>Resell, sublicense, or make Pantry available to third parties as a service</li>
          <li>Interfere with the operation of Pantry, or with anyone else’s use of it</li>
          <li>
            Use Pantry to develop a competing product, or to generate training data for an AI
            model
          </li>
          <li>Impersonate anyone, or join a household you were not invited to</li>
          <li>Remove or obscure any proprietary notice</li>
        </ul>
        <p>
          We may investigate suspected breaches and take the steps in clause 15.
        </p>
      </Section>

      <Section title="12. Households and shared data">
        <p>
          A household lets several people share a pantry, a shopping list and statistics.
          Sharing requires Pro.
        </p>
        <p>
          <strong>By joining a household, you consent to the other members seeing:</strong>{' '}
          the items you add, their prices and purchase dates, what you open, eat or throw out
          — attributed to your display name — the shared shopping list, and the household’s
          saved meals and statistics.{' '}
          <strong>Join a household only with people you are comfortable sharing that with.</strong>
        </p>
        <p>
          <strong>Invite codes are the key to a household.</strong> Do not post an invite code
          publicly or share it with anyone you do not intend to give access to. Codes expire,
          and can be revoked by the owner. You are responsible for who you invite.
        </p>
        <p>
          <strong>Household owners</strong> are responsible for who is invited and who remains
          a member, removing members who should no longer have access, and transferring
          ownership before deleting their own account.
        </p>
        <p>
          <strong>Leaving, being removed, and deleting.</strong>
        </p>
        <ul>
          <li>
            <strong>If you leave</strong>, you take a copy of the items you personally added.{' '}
            <strong>The household keeps its copy.</strong> Data you contributed continues to
            exist in that household
          </li>
          <li>
            <strong>If the owner removes you</strong>, the same applies
          </li>
          <li>
            <strong>If you delete your account</strong>, household records other members rely
            on may remain, in de-identified form or attributed to a removed user
          </li>
          <li>
            <strong>If the last member leaves</strong>, the household and its shared data are
            deleted
          </li>
          <li>
            <strong>
              If the household’s Pro subscription lapses and is not restored within 3 days
            </strong>
            , other members are moved back to their own household; the same “your copy stays
            with you, the household keeps its copy” principle applies
          </li>
        </ul>
        <p>
          This is described in more detail in the household section of our{' '}
          <a href={PATHS.privacy}>Privacy Policy</a>. Read it before you join a household. We
          are not responsible for disputes between household members, or for what a member
          does with information they can see in a shared household.
        </p>
      </Section>

      <Section title="13. Fair use limits">
        <p>
          Pantry applies caps on receipt scans and meal generation, measured hourly, weekly
          and monthly. Current caps are shown in the app and may change from time to time.
        </p>
        <p>
          These exist because every scan and every generated meal costs us money in
          third-party AI charges. A one-person business cannot absorb unlimited usage.
        </p>
        <p>We may enforce these limits, and may rate-limit, suspend or close an account that:</p>
        <ul>
          <li>Consistently and substantially exceeds normal personal use</li>
          <li>Automates requests</li>
          <li>Appears to be sharing an account across a group larger than a household</li>
        </ul>
        <p>
          We will give you notice before acting on fair use grounds, unless the conduct is
          clearly abusive or automated. We may change the caps. Where a change materially
          reduces what a paid subscriber gets, clause 14.4 applies.
        </p>
      </Section>

      <Section title="14. Availability and changes to the service">
        <p>
          <strong>We do not guarantee that Pantry will always be available.</strong> It may be
          unavailable for maintenance, for updates, or because something breaks.
        </p>
        <p>
          Pantry depends on third-party services — Apple, Supabase, Google, OpenAI, Anthropic,
          Expo, RevenueCat. If one of them is down, degraded, changes its terms, or
          discontinues a service, parts of Pantry may stop working. We will restore service as
          soon as we reasonably can.
        </p>
        <p>We may add, change or remove features.</p>
        <p>
          <strong>
            If we materially reduce or remove a feature that Pro subscribers pay for, we will
            give reasonable notice
          </strong>{' '}
          — at least 30 days where practicable — through the app or by email. If you do not
          accept the change, you can cancel through Apple, and clause 8 continues to apply.
        </p>
        <p>
          If we discontinue Pantry altogether, we will give at least 60 days’ notice where
          practicable and give you a way to export your data before it shuts down. This clause
          is subject to clause 8.
        </p>
      </Section>

      <Section title="15. Suspension and termination">
        <p>
          <strong>You can stop at any time.</strong> Delete the app, or delete your account in
          Settings → Account → Delete account.{' '}
          <strong>Cancel your subscription through Apple first.</strong>
        </p>
        <p>
          <strong>
            If you own a household with other members, you must transfer ownership before you
            can delete your account.
          </strong>{' '}
          If the other members are unreachable, email <a href={mailto}>{SUPPORT_EMAIL}</a> and
          we will help.
        </p>
        <p>
          <strong>We may suspend or terminate your account</strong> if you materially breach
          these terms, use Pantry unlawfully or in a way that harms other users or us,
          repeatedly and substantially exceed fair use limits after notice, or where we are
          required to by law.
        </p>
        <p>
          <strong>
            We will give you notice and, where the breach can be fixed, a reasonable chance to
            fix it
          </strong>{' '}
          — unless the breach is serious, unlawful, or an immediate risk to others or to the
          service.
        </p>
        <p>
          <strong>What happens to your data on termination:</strong> if you delete your
          account, the deletion cascade described in the{' '}
          <a href={PATHS.privacy}>Privacy Policy</a> runs. If we terminate for breach, we will
          give you a reasonable opportunity to export your data before deletion, unless the law
          prevents it.
        </p>
        <p>
          <strong>Termination does not automatically refund anything.</strong> Refunds are
          Apple’s, under clause 6, and clause 8 applies. Clauses 8, 9, 10, 16, 19, 20, 21, 24
          and 25 survive termination.
        </p>
      </Section>

      <Section title="16. Our intellectual property">
        <p>
          We own, or are licensed to use, everything in Pantry that is not your content: the
          app, its source code, the “Pantry” and “LSD Studios” names and logos, the design
          system, the interface, the illustrations, the copy, the shelf-life data model, and
          the generated meal templates.
        </p>
        <p>
          These are protected by copyright, trade mark and other laws. Your licence under
          clause 3 does not give you any ownership. You must not use our name, logo or branding
          without our written permission.
        </p>
        <p>
          If you think something in Pantry infringes your intellectual property, email{' '}
          <a href={mailto}>{SUPPORT_EMAIL}</a> with the details and we will investigate.
        </p>
      </Section>

      <Section title="17. Third-party services">
        <p>
          Pantry relies on services provided by Apple, Supabase, Google, OpenAI, Anthropic,
          Expo/EAS, RevenueCat and Slack.
        </p>
        <p>
          <strong>Their terms and privacy policies may also apply to you</strong>, particularly
          Apple’s, since Apple distributes the app and handles all payments.
        </p>
        <p>
          We are not responsible for third-party services, their availability, or their acts
          and omissions — except that under the Privacy Act we remain accountable for what
          overseas recipients do with personal information we disclose to them, as our{' '}
          <a href={PATHS.privacy}>Privacy Policy</a> explains, and except as clause 8 requires.
        </p>
        <p>
          Pantry may link to third-party websites. We do not endorse them and are not
          responsible for them.
        </p>
      </Section>

      <Section title="18. Disclaimers">
        <p>
          <strong>This clause is subject to clause 8.</strong>
        </p>
        <p>
          <strong>To the extent permitted by law</strong>, and subject to clause 8, Pantry is
          provided on an “as is” and “as available” basis, and we do not warrant that:
        </p>
        <ul>
          <li>Pantry will be uninterrupted, timely, secure or error-free</li>
          <li>Receipt parsing will be accurate</li>
          <li>Expiry estimates will be correct</li>
          <li>
            Meal suggestions will be accurate, safe, suitable, or consistent with your
            recorded allergies or diet
          </li>
          <li>Any defect will be corrected</li>
          <li>Pantry will meet your particular requirements</li>
        </ul>
        <p>
          <strong>
            Nothing in this clause excludes, restricts or modifies any consumer guarantee or
            other right you have that cannot lawfully be excluded.
          </strong>{' '}
          If you are a consumer under the Australian Consumer Law, the guarantees in clause 8
          apply to Pantry regardless of anything in this clause 18.
        </p>
      </Section>

      <Section title="19. Liability">
        <p>
          <strong>This clause is subject to clause 8.</strong>
        </p>
        <p>
          <strong>To the extent permitted by law</strong>, and subject to clause 8, we are not
          liable for:
        </p>
        <ul>
          <li>Indirect, incidental, special or consequential loss</li>
          <li>Loss of profit, revenue, opportunity, data or goodwill</li>
          <li>Loss caused by a third-party service being unavailable or failing</li>
          <li>
            Loss caused by your failure to check the review screen, verify ingredients, or
            follow the packaging date
          </li>
        </ul>
        <p>
          <strong>To the extent permitted by law</strong>, and subject to clause 8, our total
          liability to you in connection with Pantry in any 12-month period is limited to the
          greater of the amount you paid us for Pantry in that period, or AUD $100.
        </p>
        <p>
          <strong>These limits do not apply to:</strong> liability for death or personal
          injury; liability for fraud or fraudulent misrepresentation; any liability under a
          consumer guarantee or other right that cannot lawfully be excluded, restricted or
          modified; or anything else that the law does not permit us to limit.
        </p>
        <p>
          Where our liability for a failure to comply with a consumer guarantee{' '}
          <strong>can</strong> lawfully be limited, it is limited as set out in clause 8.
        </p>
        <p>
          Nothing in this clause is intended to operate as a representation that you have no
          rights against us. <strong>You do.</strong> Clause 8 sets them out.
        </p>
      </Section>

      <Section title="20. Indemnity">
        <p>
          <strong>To the extent permitted by law</strong>, you agree to indemnify us against
          reasonable loss, damage, cost or expense we suffer arising from:
        </p>
        <ul>
          <li>Your breach of these terms</li>
          <li>Your unlawful use of Pantry</li>
          <li>
            Content you upload that infringes someone else’s rights, or that contains another
            person’s personal or financial information you had no right to upload
          </li>
          <li>
            A claim brought against us by another member of a household you are in, arising
            from your conduct
          </li>
        </ul>
        <p>
          <strong>This indemnity does not apply</strong> to the extent the loss was caused or
          contributed to by us, to any liability we have to you under a consumer guarantee or
          other non-excludable right, or where the law does not permit an indemnity in these
          terms.
        </p>
        <p>
          We will tell you promptly of any claim we say is covered, let you participate in the
          defence, and not settle it without your consent (not to be unreasonably withheld).
          This clause is subject to clause 8.
        </p>
      </Section>

      <Section title="21. Apple">
        <p>
          This clause applies because Pantry is distributed through the Apple App Store under
          our own licence terms rather than Apple’s standard EULA.
        </p>
        <p>
          <strong>This agreement is between you and us, not Apple.</strong> Apple is not a
          party to it. <strong>We, not Apple, are solely responsible for Pantry</strong> and
          its content.
        </p>
        <p>
          Your licence to use Pantry is limited to a non-transferable licence to use it on
          Apple-branded products you own or control, as permitted by the Usage Rules in the
          Apple Media Services Terms and Conditions.
        </p>
        <p>
          <strong>Maintenance and support.</strong> We, not Apple, are solely responsible for
          support. <strong>Apple has no obligation to provide any maintenance or support for
            Pantry.</strong> Support requests go to <a href={mailto}>{SUPPORT_EMAIL}</a>.
        </p>
        <p>
          <strong>Warranty.</strong> To the extent permitted by law, and subject to clause 8,
          Apple gives no warranty for Pantry. If Pantry fails to conform to any applicable
          warranty, you may tell Apple, and Apple will refund the purchase price. To the
          maximum extent permitted by law,{' '}
          <strong>Apple has no other warranty obligation of any kind for Pantry.</strong> Any
          other claim, loss, liability, damage, cost or expense attributable to a failure to
          conform to a warranty is our responsibility, not Apple’s, subject to clause 8.
        </p>
        <p>
          <strong>Product claims.</strong> We, not Apple, are responsible for addressing any
          claim by you or a third party about Pantry or your use of it, including product
          liability claims; a claim that Pantry fails to conform to a legal or regulatory
          requirement; and claims under consumer protection, privacy or similar legislation,
          including in connection with Pantry’s use of any framework.{' '}
          <strong>This does not limit your rights against us under clause 8.</strong>
        </p>
        <p>
          <strong>Intellectual property claims.</strong> If a third party claims that Pantry or
          your use of it infringes their intellectual property,{' '}
          <strong>we, not Apple, are solely responsible</strong> for the investigation,
          defence, settlement and discharge of that claim.
        </p>
        <p>
          <strong>Legal compliance.</strong> You represent that you are not located in a
          country subject to a US Government embargo or designated by the US Government as a
          “terrorist supporting” country, and that you are not on any US Government list of
          prohibited or restricted parties.
        </p>
        <p>
          <strong>Third-party beneficiary.</strong>{' '}
          <strong>Apple and Apple’s subsidiaries are third-party beneficiaries of these
            terms</strong>, and on your acceptance of them, Apple has the right (and is deemed to
          have accepted the right) to enforce them against you as a third-party beneficiary.
        </p>
        <p>
          For any question, complaint or claim about Pantry, contact us at{' '}
          <a href={mailto}>{SUPPORT_EMAIL}</a>.
        </p>
      </Section>

      <Section title="22. Privacy">
        <p>
          Our <a href={PATHS.privacy}>Privacy Policy</a> explains what personal information we
          collect, why, who we share it with, how long we keep it, and how to access, correct
          or delete it. It forms part of this agreement.
        </p>
        <p>
          Please read it before you join a household — the household section explains what
          other household members can see and what survives when you leave.
        </p>
      </Section>

      <Section title="23. Changes to these terms">
        <p>
          We may change these terms. The version number and effective date at the top will
          change.
        </p>
        <p>
          <strong>For material changes</strong>, we will give you notice in the app or by email{' '}
          <strong>at least 14 days before</strong> they take effect.
        </p>
        <p>
          <strong>
            Continuing to use Pantry after a change takes effect means you accept the change.
          </strong>{' '}
          If you do not accept it, stop using Pantry, cancel your subscription through Apple,
          and delete your account. A change to these terms does not apply retrospectively to a
          dispute that arose before it took effect.
        </p>
      </Section>

      <Section title="24. Disputes and governing law">
        <p>
          <strong>Talk to us first.</strong> Most problems can be sorted out by email. Contact{' '}
          <a href={mailto}>{SUPPORT_EMAIL}</a> with the details and we will respond within a
          reasonable time — usually within 10 business days — and try in good faith to resolve
          it.
        </p>
        <p>
          These terms are governed by the laws of{' '}
          <strong>New South Wales, Australia</strong>. Australian law applies.
        </p>
        <p>
          <strong>
            Nothing in this clause limits your right to bring proceedings in a court or
            tribunal that has jurisdiction where you live
          </strong>
          , or to access a state or territory consumer tribunal such as NCAT, or to complain to
          the ACCC, a state fair trading body, or the OAIC. We will not argue that a clause in
          these terms prevents you from doing any of those things.
        </p>
        <p>
          Nothing in this clause requires you to arbitrate, or prevents you from participating
          in proceedings you are otherwise entitled to bring.
        </p>
      </Section>

      <Section title="25. General">
        <p>
          <strong>Severability.</strong> If a clause or part of a clause is unenforceable, it
          is severed and the rest continues to apply.
        </p>
        <p>
          <strong>Entire agreement.</strong> These terms and the{' '}
          <a href={PATHS.privacy}>Privacy Policy</a> are the whole agreement between us about
          Pantry and replace anything said or written earlier. This does not exclude liability
          for a misleading representation, or any right under clause 8.
        </p>
        <p>
          <strong>Assignment.</strong> You may not assign or transfer your rights under these
          terms. We may assign ours if we sell or transfer the business, provided your rights
          are not materially reduced; we will tell you before we do.
        </p>
        <p>
          <strong>Waiver.</strong> If we do not enforce a right, we do not give it up.{' '}
          <strong>No agency.</strong> These terms do not create a partnership, agency, joint
          venture or employment relationship.
        </p>
        <p>
          <strong>Notices.</strong> We may give you notice in the app, by push notification, or
          by email to the address on your account. You give us notice by email to{' '}
          <a href={mailto}>{SUPPORT_EMAIL}</a>. A notice is taken to be given on the day it is
          sent, unless it bounces.
        </p>
        <p>
          <strong>Force majeure.</strong> We are not liable for failing to perform because of
          something beyond our reasonable control, including a third-party service outage — but
          we must still tell you and must resume as soon as we reasonably can. This clause is
          subject to clause 8.
        </p>
        <p>
          <strong>Interpretation.</strong> Headings are for convenience. “Including” means
          “including without limitation”. A reference to a law includes any amendment or
          replacement.
        </p>
      </Section>

      <Section title="26. Contact">
        <p>
          <strong>Benjamin James Linehan Scott</strong> (ABN 45 718 906 920) trading as Pantry
          / LSD Studios
          <br />
          Chatswood NSW 2067, Australia
          <br />
          Support and privacy: <a href={mailto}>{SUPPORT_EMAIL}</a>
        </p>
        <p>
          Help with the app is on the <a href={PATHS.support}>support page</a>.
        </p>
      </Section>
    </Legal>
  )
}
