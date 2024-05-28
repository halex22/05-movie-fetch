export function validationSearch(search) {
	if (search === '') return "A value must be entered";
	if (search.match(/^\d+$/)) return "Only digits search can not be executed";
	if (search.length < 3)  return 'At least 3 chars must be given';
	return null;
}