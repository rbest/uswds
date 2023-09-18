const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const behavior = require("../../uswds-core/src/js/utils/behavior");

const { prefix: PREFIX } = require("../../uswds-core/src/js/config");

const RANGE_CLASSNAME = `${PREFIX}-range`;
const RANGE = `.${RANGE_CLASSNAME}`;

/**
 * Called when range slider has optional unit data attribute.
 * Collects necessary attributes, then constructs and appends aria-valuetext attribute for screen reader context.
 *
 * @param {HTMLInputElement} targetRange - The range slider input element
 */
const updateCallout = (targetRange) => {
  const rangeSlider = targetRange;
  const unit = rangeSlider.getAttribute("data-optional-unit");
  const val = rangeSlider.value;
  const max = rangeSlider.getAttribute("max");
  const callout = `${val} ${unit || ""} of ${max}`;

  rangeSlider.setAttribute("aria-valuetext", callout);
};

/**
 * Checks for optional unit data attribute. If attribute is present, updates aria-valuetext and adds input event listener.
 *
 * @param {HTMLInputElement} baseComponent - Range slider html input element in DOM.
 */
const enhanceSRContext = (baseComponent) => {
  const rangeSlider = baseComponent;

  updateCallout(rangeSlider);
};

const rangeEvents = {
  change: {
    [RANGE]() {
      updateCallout(this);
    },
  },
};

const range = behavior(rangeEvents, {
  init(root) {
    selectOrMatches(RANGE, root).forEach((rangeSlider) => {
      enhanceSRContext(rangeSlider);
    });
  },
});

module.exports = range;
