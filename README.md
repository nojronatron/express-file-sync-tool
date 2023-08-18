# Express File Sync Tool

Exploring use of Express-js as a platform for detecting new-files in a target folder, processing them, and sending specific file data using REST for storage in a back-end file system and/or database.

## Expections

- This is an exploration and is not intended for production or _trustworthy_ use.
- Files that change in configured source folder(s) defined using ENV files will be processed and parsed for specific data using a regex.
- Processed file data that meets RegEx criteria will be stored in a separate file on the 'server' (database) instance.
- Processed file data that meets RegEx criteria will be submitted to the 'server' (database) using HTTP POST.
- Future design and implementation of a more robust solution will be derived (at least in part) from work done in this repository.
