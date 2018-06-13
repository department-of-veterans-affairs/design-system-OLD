# Intent

Breadcrumbs are intended to provide users an understanding of where they are located in a rich information structure. They work well in situations where users may have clicked several layers deep, and would want to move back toward the top in linear steps.

## Mobile Width Adaptation

The breadcrumb component switches to a single previous step link when the screen is collapsed or zoomed smaller than 481 device pixels or a custom `props.mobileWidth` declaration. This adaptation is designed to minizime the breadcrumb's footprint on smaller screens and is beneficial for sites with many layers.

## Optional Props

### id (STRING)

Passing prop `id='<STRING>'` to the `<Breadcrumb>` component will append that ID to the `<nav>` element. If no `id` is passed, a unique id will be created by concatnating the string `va-breadcrumbs-` with a string returned by `lodash.uniqueid`.

### listId (STRING)

Passing prop `listId='<STRING>'` to the `<Breadcrumb>` component will append that list ID to the `<ul>` element. If no `listId` is passed, a unique id will be created by concatnating the string `va-breadcrumbs-list-` with a string returned by `lodash.uniqueid`.

### mobileWidth (NUMBER)

Passing prop `mobileWidth='<NUMBER>'` to the `<Breadcrumb>` component will modify the breakpoint width for swapping the full breadcrumb with the mobile "back by one" breadcrumb link. For instance, passing `mobileWidth="375"` to the Breadcrumb will trigger the mobile breadcrumb when a user resizes their window width to 375px or less.

Zooming will also trigger the mobile breadcrumb. If a user zooms their window to 400% at 1200px wide, the mobile breadcrumb would be triggered, because 1200/4 = 300px.

## Accessibility

The `<Breadcrumb />` component has been tested and verified for accessibility. It is fully keyboard accessible, and announces the current page correctly in the following screen reader combinations:

* MacOS + Safari + VoiceOver
* MacOS + Chrome + VoiceOver
* iOS + Safari + VoiceOver
* Windows 7/10 + Firefox + NVDA
* Windows 7/10 + IE11 + JAWS

### aria-current (attribute)

The `<Breadcrumb />` component automatically adds an `[aria-current="page"]` attribute to the last link rendered by the full breadcrumb list. This attribute triggers an `a[aria-current="page"]` CSS selector, makes the link bold, removes the underline, and changes it to a black text color. Current [WAI-ARIA authoring practices](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/breadcrumb/index.html) recommend this `aria-current="page"` attribute for screen reader context.
