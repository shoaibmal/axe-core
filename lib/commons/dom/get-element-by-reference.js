/* global dom */

/**
 * Returns a reference to the element matching the attr URL fragment value
 * @method getElementByReference
 * @memberof axe.commons.dom
 * @instance
 * @param {Element} node
 * @param {String} attr Attribute name (href)
 * @return {Element}
 */
dom.getElementByReference = function(node, attr) {
	let fragment = node.getAttribute(attr);

	if (fragment && fragment.charAt(0) === '#') {
		fragment = decodeURIComponent(fragment.substring(1));

		let candidate = document.getElementById(fragment);
		if (candidate) {
			return candidate;
		}

		candidate = document.getElementsByName(fragment);
		if (candidate.length) {
			return candidate[0];
		}
	}
	return null;
};
