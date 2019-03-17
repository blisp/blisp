(module
  (memory (export "memory") 1 100)

  (global $ap (mut i32) (i32.const 8))

  (global $i32 i32 (i32.const 1))

  ;; struct {
  ;;   char tag;
  ;;   union {
  ;;     i32
  ;;     i64
  ;;     f32
  ;;     f64
  ;;     list
  ;;     symbol
  ;;   }
  ;; };

  (func $compile (param $form i32) (result i32)
    (if (i32.and (i32.const 1) (get_local $form))
      (then
        (get_local $form)
        (return)))
    (i32.shr_u (get_local $form) (i32.const 1)))

  (func $to_i32 (param $num i32) (result i32)
  ;; TODO: This is backwards if we align pointers to multiples of 8
    (if (i32.le_u (get_local $num) (i32.shl (i32.const 1) (i32.const 31)))
      (then
        (i32.shl (i32.const 1) (i32.const 1))
        (return)))
    (i32.store8 (get_global $ap) (get_global $i32))
    (i32.store
      ;; TODO: Use offset
      (i32.add (i32.const 4) (get_global $ap))
      (get_local $num))
    (set_global $ap (i32.add (i32.const 8) (get_global $ap)))
    (i32.sub (get_global $ap) (i32.const 8)))

  (func $test_fixnum (result i32)
    (select
      (i32.const 0)
      (i32.const 1)
      (i32.eq (call $compile (i32.const 2)) (i32.const 1))))

  (func $test_box32 (result i32)
    (if (i32.ne (call $to_i32 (i32.const 1)) (i32.const 2))
      (then (i32.const 1) (return)))
    (call $to_i32 (i32.const 0xffffffff)))

  (func $main (export "main") (param $form i32) (result i32)
    (call $test_box32)))
