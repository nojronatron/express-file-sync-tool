# Express File Sync Tool

Exploring use of Express-js as a platform for detecting new-files in a target folder, processing them, and sending specific file data using REST for storage in a back-end file system and/or database.

## Expections

- This is an exploration and is not intended for production or _trustworthy_ use.
- Files that change in configured source folder(s) defined using ENV files will be processed and parsed for specific data using a regex.
- Processed file data that meets RegEx criteria will be stored in a separate file on the 'server' (database) instance.
- Processed file data that meets RegEx criteria will be submitted to the 'server' (database) using HTTP POST.
- Future design and implementation of a more robust solution will be derived (at least in part) from work done in this repository.

## Goals Achieved

- [x] Can detect new files in configured location and read-in file data.
- [x] Can format file data suitable for storing in database records.
- [x] Client-side can send a POST REST message to a configured server address properly.
- [x] Server-side can process new file data and store in a logfile, appending data.
- [x] Server-side can receive POST data from configured client, process the data, and store in a local MongoDB collection.
- [x] MongoDB driver used for CRUD (although no update nor delete was done)

## Lessons Learned

- Avoid mixing server-side and client-side code into a single project whenever possible due to confusing (complex) code execution path logic overlaps.
- Consider a different language/platform so users don't have to install NPM or other 'web' dependencies.
- Don't try to close a MongoDB Client right after operating on it (uses Promises), instead close the client with a separate operation if necessary.

## Going Forward

- Find out what database file structure is needed for storing data e.g. MDF (preferred)? XLSX (less-preferred)? Other?
- Determine the minimim user-input needed to configure the client and server apps to get them talking to each other.
- Design a UI that will serve as a 'server side' control panel.
- Design a UI that will serve as a 'client side' display, or create a unified UI that could do either, possibly based on configuration.
