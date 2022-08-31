import sections from '../state/sections'; 

const isMobile = '(max-width: 992px)';
const threshold = window.matchMedia(isMobile).matches ? 0.1 : 0;
const settings = {threshold: threshold};

const waypoint = (el) => {
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const keyName = entry.target.id;

			if (!keyName) {return};
			
			sections.value[keyName].threshold = threshold;
			sections.value[keyName].intersectionRatio = entry.intersectionRatio;

			if (entry.isIntersecting) {
				sections.value[keyName].viewed = true;
			}
			else {
				sections.value[keyName].active = false;
			}
			
			//Create an array of section thresholds and find the highest one
			const ratios = Object.keys(sections.value).map(section => sections.value[section].intersectionRatio);
			const highRatio = ratios.sort().reverse()[0];

			//Set the section with highest threshold as active
			for (const section in sections.value) {
				if (sections.value[section].intersectionRatio === highRatio) {
					sections.value[section].active = true;
				}
				else {
					sections.value[section].active = false;
				}
			}
		});
	}, settings);

	observer.observe(el);
};

export default waypoint;