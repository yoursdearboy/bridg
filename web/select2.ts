import "select2/dist/css/select2.min.css";
import select2 from "select2";
import jQuery from "jquery";

select2(jQuery);

jQuery(() => {
  jQuery(".select2").select2();
});
