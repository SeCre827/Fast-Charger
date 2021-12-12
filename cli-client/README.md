# CLI client

Here lies the Command line interface (CLI) source code.

After you have pull the code to your machine.
Run npm install to install the dependencies.
And npm link so you can use the CLI globally in your system.

You can access the cli in a terminal by typing:
ev_group22
Then you can see al the available commands and how to use them.

## Cli example calls

Version

\*ev_group22 -V

healthcheck:

\*ev_group22 healthcheck

resetsessions:

\*ev_group22 resetsessions

login:

\*ev_group22 login SeCre password

logout:

\*ev_group22 logout

SessionsPerPoint:

\*ev_group22 SessionsPerPoint 1 20190303 20220303 json

SessionsPerStation:

\*ev_group22 SessionsPerStation 1 20150303 20220303 json

SessionsPerEV:

\*ev_group22 SessionsPerEV 2 20190303 20220303_to json

SessionsPerProvider:

\*ev_group22 SessionsPerProvider 2 20110303_from 20220303_to json

ADMIN:

UPD:

\*ev_group22 Admin --sessionupd --source 'C:\Users\SeCre\Desktop\project\TL20-22\back-end\data\transactions.csv'

usermod:

\*ev_group22 Admin --usermod --username Sotiria1 --passw 12345671 --email Soritia1@mail.com --rights customer

\*ev_group22 Admin --usermod --username Sotiria1 --passw 12345672

users:

\*ev_group22 Admin --users --username Sotiria1

heathcheck/reset sessions:

\*Δεν υπαρχουν στο scope tou admin μιας και είναι διαθέσιμα απο όλους
