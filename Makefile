TEST=$(TEST)
NODEUNIT=./node_modules/nodeunit-fork/bin/nodeunit

test_index:
	$(NODEUNIT) test/index.test.js

test_account:
	$(NODEUNIT) test/account.test.js

test_number:
	$(NODEUNIT) test/number.test.js

test_sms:
	$(NODEUNIT) test/sms.test.js

test: test_index test_account test_number test_sms

.PHONY: test