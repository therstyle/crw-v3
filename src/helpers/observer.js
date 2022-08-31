import sections from '../state/sections'; 

const isMobile = '(max-width: 992px)';
const threshold = window.matchMedia(isMobile).matches ? 0.1 : 0;
const config = {threshold: threshold};

const waypoint = (el) => {
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const keyName = entry.target.id;

			if (!keyName) {return};
			if (entry.isIntersecting) {
				sections.value[keyName].viewed = true;
			}

			sections.value[keyName].intersectionRatio = threshold;
		});
	}, config);

	observer.observe(el);
};

export default waypoint;