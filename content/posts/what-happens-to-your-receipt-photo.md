---
slug: what-happens-to-your-receipt-photo
title: "What happens to your receipt photo after Pantry scans it"
excerpt: "The image is read, turned into a dated list, and deleted about six hours later. Where it goes in between, what Pantry keeps, and what you can switch off."
tag: PRODUCT
publishDate: 2026-10-01
image: /assets/blog/blog-what-happens-to-your-receipt-photo.svg
imageAlt: "A phone photographing a supermarket receipt on a kitchen bench, with a small padlock icon"
keywords: ["receipt scanning app privacy", "is it safe to scan receipts with an app", "what happens to receipt photos in an app", "pantry app privacy receipt"]
---

Your receipt photo is read, turned into a list of dated pantry items, and deleted about six hours after processing. That is the whole life of the image, per [Pantry’s privacy policy](/privacy). The parsed items stay, because they are the point. The photo does not. This post walks through the steps in between, what Pantry keeps from the docket and what it does not, and the one setting worth knowing about before your first scan.

## What a receipt gives away

A supermarket receipt is not only groceries. Pantry’s privacy policy says so in plain words: a docket can carry the shop and its location, the date and time you were there, every line and price, the total, a loyalty number, the last four digits of a card, and anything else bought on the same trip. Any app that asks for a photo of it is asking for all of that, whether or not it wants it. That is the reason to read the policy of any [receipt scanning app](/resources/receipt-scanning-apps-compared) before the first photo, Pantry included.

## The three steps between photo and list

The policy sets out the route.

1. **The photo uploads to storage.** You take it with the camera or pick it from your photo library, and it goes to Pantry’s file storage, which the policy states is hosted in Sydney, Australia.
2. **The text is read.** The image is sent to Google Cloud Vision to turn the print into text. This is the step that copes with [the faded, abbreviated, crumpled print](/resources/how-pantry-reads-a-receipt) that Australian supermarkets produce.
3. **The text becomes items.** The text goes to Pantry’s AI provider to be turned into structured lines: name, quantity, price, date, merchant. Those are the only fields Pantry extracts, per the policy. The loyalty number and the card digits are not among them.

Then you review the list. Any line that came back wrong takes two taps to fix, and any line you do not want saved can be deleted at the review step before it is stored. Confirm, and each item becomes an entry with a purchase date and a shelf-life estimate from [the same CSIRO-grounded data as this site](/resources/where-pantrys-expiry-dates-come-from).

## When the photo is deleted

About six hours after processing, per the policy. The image is not kept as a record of the shop, and it is not attached to the items it produced. You can also crop the photo before it uploads, so the part of the docket that is not groceries never leaves your phone in the first place.

## What Pantry keeps

The parsed data: shop, date, line items, prices and totals, held until you delete the item or your account. That is what makes the list work. It is also attributed to the person who scanned it, which matters in a shared household. The policy is explicit that if you scan a receipt with items for the whole house, those items land in the shared list for [everyone in the household](/resources/six-phones-one-pantry) to see, with your name on the add.

Pantry never receives your card or payment details. Apple handles all billing, and that holds for [the Free and Pro plans](/resources/pantry-free-vs-pro) alike.

## The one exception, and the switch

Most images go on the six-hour cycle. The exception is a scan that fails or parses badly. Pantry keeps a capped set of those images for longer, as a test set, to work out why the read went wrong and to check that a fix works. The policy treats this as a secondary purpose that needs your consent, asks at onboarding, and gives the limits: no more than 500 images, kept no longer than 12 months, stored in the same bucket with the same access controls, never used to train an AI model of Pantry’s own and never handed to a vendor to train on.

You can turn it off at any time in Settings, under Privacy, with the switch labelled “Help improve receipt scanning”. Off means no further failed scans of yours are kept, any of yours already in the set are deleted within seven days, and your scans keep working exactly as before.

## You do not have to scan at all

Receipts are the fastest way into Pantry, and the reason [it reads Coles, Woolworths and Aldi dockets](/resources/does-pantry-read-coles-woolworths-aldi-receipts) rather than asking for a barcode per item. They are not compulsory. The policy says you can add pantry items manually, and the dates and the digest work the same way from there.

The trade is a clear one. Thirty seconds with a photo, six hours of an image sitting in Sydney storage, and a list that knows what you bought and when. Pantry is on the waitlist, ahead of launch, with [the full privacy policy](/privacy) published now, before the first receipt is ever scanned. [Join the waitlist](/#waitlist) with the small print already read.
