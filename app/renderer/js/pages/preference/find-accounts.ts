'use-strict';

import BaseComponent from '../../components/base';
import * as LinkUtil from '../../utils/link-util';
import * as t from '../../utils/translation-util';

export default class FindAccounts extends BaseComponent {
	// TODO: TypeScript - Here props should be object type
	props: any;
	$findAccounts: Element | null;
	$findAccountsButton: Element | null;
	$serverUrlField: HTMLInputElement | null;
	constructor(props: any) {
		super();
		this.props = props;
	}

	template(): string {
		return `
			<div class="settings-card certificate-card">
				<div class="certificate-input">
					<div>${t.__('Organization URL')}</div>
					<input class="setting-input-value" value="zulipchat.com"/>
				</div>
				<div class="certificate-input">
					<button class="green w-150" id="find-accounts-button">${t.__('Find accounts')}</button>
				</div>
			</div>
		`;
	}

	init(): void {
		this.$findAccounts = this.generateNodeFromTemplate(this.template());
		this.props.$root.append(this.$findAccounts);
		this.$findAccountsButton = this.$findAccounts.querySelector('#find-accounts-button');
		this.$serverUrlField = this.$findAccounts.querySelectorAll('input.setting-input-value')[0] as HTMLInputElement;
		this.initListeners();
	}

	findAccounts(url: string): void {
		if (!url) {
			return;
		}
		if (!url.startsWith('http')) {
			url = 'https://' + url;
		}
		LinkUtil.openBrowser(new URL('/accounts/find', url));
	}

	initListeners(): void {
		this.$findAccountsButton.addEventListener('click', () => {
			this.findAccounts(this.$serverUrlField.value);
		});

		this.$serverUrlField.addEventListener('click', () => {
			if (this.$serverUrlField.value === 'zulipchat.com') {
				this.$serverUrlField.setSelectionRange(0, 0);
			}
		});

		this.$serverUrlField.addEventListener('keypress', event => {
			if (event.key === 'Enter') {
				this.findAccounts(this.$serverUrlField.value);
			}
		});

		this.$serverUrlField.addEventListener('input', () => {
			if (this.$serverUrlField.value) {
				this.$serverUrlField.classList.remove('invalid-input-value');
			} else {
				this.$serverUrlField.classList.add('invalid-input-value');
			}
		});
	}
}
