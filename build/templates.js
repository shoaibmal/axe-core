module.exports = {
	evaluate: 'function (node, options, virtualNode, preloadedAssets) {\n<%=source%>\n}',
	after: 'function (results, options) {\n<%=source%>\n}',
	gather: 'function (context) {\n<%=source%>\n}',
	matches: 'function (node, virtualNode) {\n<%=source%>\n}',
	source: '(function () {\n<%=source%>\n}())',
	commons: '<%=source%>'
};
