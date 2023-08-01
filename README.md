# Deel - Frontend Test

## Running the project

> npm i && npm start

## Assignment Checklist

1. ✅ You cannot use any 3rd party libraries - only pure React and internal DOM functions.
1. ✅ You should use TypeScript and write proper interfaces and types.
1. ✅ (⚠️) The function to filter the data should be asynchronous. You can use mock data (such as a JSON array), but the function which uses it should be asynchronous (similar to a real REST call).
1. ✅ It should have basic working CSS. No need for anything fancy (such as dropshadows etc), but should look decent.
1. ✅ You need to handle all non-standard/edge use-cases - it should have a perfect user-experience.
1. ✅ Highlight the matching part of the text, in addition to showing it.
1. ✅ No external state management libraries (refer to #1 as well), only native React method.
1. ✅ Use only functional component with hooks.
1. ✅ Shortcuts and hacks are perfectly ok - but you have to add comments on what are you doing there and why. You should either write production ready code or include comments on what needs to be changed for production.
1. ✅ Add a README.md file explaining how to run the project.
1. ✅ Bonus #1: load data using a real API call to some resource.

## Disclaimers

1. I added the package `classnames` to simplify the syntax of conditional className.
1. I structured the Autocomplete component to be data agnostic, so there was no reason for the filter function (`findSuggestions`) to be asynchronous. I hope this won't be a problem.
