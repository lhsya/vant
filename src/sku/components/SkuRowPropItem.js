import { createNamespace } from '../../utils';

const [createComponent] = createNamespace('sku-row-prop-item');

export default createComponent({
  props: {
    skuValue: Object,
    skuKeyStr: String,
    skuEventBus: Object,
    selectedProp: Object,
    multiple: Boolean,
    disabled: Boolean,
  },

  computed: {
    choosed() {
      const { selectedProp, skuKeyStr, skuValue } = this;

      if (selectedProp && selectedProp[skuKeyStr]) {
        return selectedProp[skuKeyStr].indexOf(skuValue.id) > -1;
      }

      return false;
    },
  },

  methods: {
    onSelect() {
      if (this.disabled) return;

      this.skuEventBus.$emit('sku:propSelect', {
        ...this.skuValue,
        skuKeyStr: this.skuKeyStr,
        multiple: this.multiple,
      });
    },
  },

  render() {
    return (
      <span
        class={[
          'van-sku-row__item',
          { 'van-sku-row__item--active': this.choosed },
          { 'van-sku-row__item--disabled': this.disabled },
        ]}
        onClick={this.onSelect}
      >
        <span class="van-sku-row__item-name">{this.skuValue.name}</span>
      </span>
    );
  },
});
