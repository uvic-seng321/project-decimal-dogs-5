## Requirements
1. Do requirements exhibit a clear distinction between functions and data?

Yes, all the requirements are very function based.

3. Do requirements define all the information to be displayed to users?

Yes.

5. Do requirements address system and user response to error conditions?

No.

6. Is each requirement stated clearly, concisely, and unambiguously?

Yes. Each of our mandatory requirements are clearly stated.

7. Is each requirement testable?

Yes, each mandatory requirement is very testable and the results be verified in the UI and the database.

8. Are there ambiguous or implied requirements?

No.

10. Are there conflicting requirements?

No. All 5 of our manaditory requirements cover distinctive features that are not conflicting.

11. Are there areas not addressed in the requirements that need to be?
12. Are there requirements that contain an unnecessary level of design detail?

### Items that may or may not apply to our project
1. Are performance requirements (such as response time, data storage requirements) stated?

No, however, for this small-scale project these are mainly irrelevant.

3. If the requirements involve complex decision chains, are they expressed in a form that facilitates comprehension (i.e., decision tables, decision trees, etc.)?

The requirements did not involve complex decision chains.

5. Have requirements for performing software upgrades been specified?

Not applicable for this project.

6. Have the real-time constraints been specified in sufficient detail?

Not applicable for this project.

8. Has the precision and accuracy of calculations been specified?

Not applicable for this project.

10. Is it possible to develop a thorough set of tests based on the information contained in the SRS? If not, what information is missing?

Yes, as each of our requirements also contain smaller requirements that make it easier to write tests.

12. Have Assumptions and Dependencies been clearly stated?

There were no major assumptions to be made.

14. Does the document contain all the information called out in the outline for the SRS?

Yes.

## Design Checklists
Ideally, begin by identifying the key quality attribute scenarios. It is hard to come up with obvious design review questions without understanding the system context. Still, given the type of project we tackle in the course, you should review the following about the design:
1. Error-handling: does the design explain how errors are managed, and recovered from? 

No.

3. Logging: is there a way to understand what is happening in the system (e.g., logins, pages requested, errors)

Yes.

4. Data storage: is the design specific about what data is stored and where?

All the data is stored in a MySQL database.

5. Security: does the design explain a security model, including data-at-rest and data-in-transit?

No.

6. User management: how are user accounts managed? What is the authentication and identification approach?

All the user data is securly stored in the MySQL database.

7. Performance: how does the design accommodate performance demands, including out-of-sample (>2 standard dev.) spikes?

Not applicable for this project.

9. External components: does the design outline the components it relies on, and why? What is the update/versioning approach?

Yes, the readme file clearly contains how to install and the necessary external tools for the program

9. Call-graph: can the design explain how the system works in the happy path? 
10. Usability and UX: is there a front-end concept that presents a usable and coherent experience for the user? Are users identified?

Yes, the users are identified and the front end has a usable design.

12. Accessibility and internationalization (i18n): are there ways to accommodate accessibility requirements (alt. text) and the need to handle non-ASCII/English users?

Not applicable for this project.

13. Testing/devops: does the design make clear how the product is built and deployed? How does this work? Where is it running?

The instructions for the program explain how the product is built and deployed.
