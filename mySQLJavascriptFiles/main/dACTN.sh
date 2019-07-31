#!/bin/bash
# a script to delete the database and create the tables
node deleteDatabase
node createDatabase
node createTables
node createTemporaryUser
