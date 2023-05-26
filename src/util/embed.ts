import {EmbedBuilder } from "discord.js";

export const NoPermission = new EmbedBuilder().setAuthor({
    name: "ข้อผิดพลาด - You not have permission❌",
    iconURL: "https://cdn.discordapp.com/attachments/1005749218159362078/1111324655836483655/344337499_196068759895489_8839659286137119626_n.jpg"
}).setDescription("``` คุุณไม่มีสิทธิ์จะใช้คำสั่งนี้ - You not have permission to use this ```").setColor("#E33A36").setTitle("เกิดข้อผิดพลาด").setTimestamp(new Date());

export const Error = new EmbedBuilder().setAuthor({
    name: "ข้อผิดพลาด - Uncatch error",
    iconURL: "https://cdn.discordapp.com/attachments/1005749218159362078/1111324655836483655/344337499_196068759895489_8839659286137119626_n.jpg"
}).setDescription("``` เกิดข้อผิดพลาดที่ไม่ระบุได้ - Unexpected error ```").setColor("#E33A36").setTitle("เกิดข้อผิดพลาด").setTimestamp(new Date());


export const AlreadyExists = new EmbedBuilder().setAuthor({
    name: "ได้ทำการตั่งค่าระบบเสร็จแล้ว - Already setup",
    iconURL: "https://cdn.discordapp.com/attachments/1005749218159362078/1111324655836483655/344337499_196068759895489_8839659286137119626_n.jpg"
}).setDescription("``` ได้ทำการตั่งค่าระบบเสร็จแล้ว - Already setup ```").setColor("#E33A36").setTitle("เกิดข้อผิดพลาด").setTimestamp(new Date());

export const Vertify = new EmbedBuilder().setTitle('🤖 นายเป็นหุ่นยนต์หรือป่าว').setDescription('เพื่อจะยืนยันตัวตนว่คุณเป็นมนุษย์หริอไม่กรุณาคลิกที่ปุ่มด้านล่าง `✅Verify` เพื่อเข้าสู่เซิฟเวอร์').setImage('https://media.discordapp.net/attachments/1071121457352028233/1071123192107773999/ezgif-2-cf057197f6.gif').setTimestamp(new Date()).setColor("#41EA5C")

export const Setupdone = new EmbedBuilder().setTitle('✅ การตั่งค่าสำเร็จเสร็จสิ้น').setDescription('การตั่งค่าสำเร็จเสร็จสิ้น').setImage('https://media.discordapp.net/attachments/1071121457352028233/1071123192107773999/ezgif-2-cf057197f6.gif').setTimestamp(new Date()).setColor("#41EA5C")

export const AlreadyVertify = new EmbedBuilder().setTitle('❌ คุณทำการยืนยันอยู่').setDescription('``` โปรดพิม /cancel เพื่อทำการยืนยันใหม่ ```').setTimestamp(new Date()).setColor("#E33A36")

export const NotAlreadyVertify = new EmbedBuilder().setTitle('❌ คุณยังไม่ได้ยืนตัวตน').setDescription('``` โปรดยืนยันตัวตนก่อน ```').setTimestamp(new Date()).setColor("#E33A36")

export const DoneCancel = new EmbedBuilder().setTitle('✅ ยกเลิกยืนตันตัวแล้ว').setDescription('``` ยกเลิกยืนตันตัวแล้ว ```').setTimestamp(new Date()).setColor("#41EA5C")

export const WrongAwsner = new EmbedBuilder().setTitle('❌ คำตอบไม่ถูกต้อง').setDescription('``` โปรดเลือกใหม่ ```').setTimestamp(new Date()).setColor("#E33A36")

export const RoleCantEdit = new EmbedBuilder().setTitle('❌ ไม่สามราถเพิ่มยศหรือลบออกให้ได้').setDescription('``` โปรดติดต่อผู้ดูแล ```').setTimestamp(new Date()).setColor("#E33A36")

export const DoneVertify = new EmbedBuilder().setTitle('✅ ยืนตันตัวสำเร็จแล้ว').setDescription('``` สามรถเข้าสู่เซิฟเวอร์ได้แล้ว ```').setTimestamp(new Date()).setColor("#41EA5C")

export const NotAlreadyExists = new EmbedBuilder().setAuthor({
    name: "ยังไม่ได้ตั่งค่าระบบ - Not setup yet",
    iconURL: "https://cdn.discordapp.com/attachments/1005749218159362078/1111324655836483655/344337499_196068759895489_8839659286137119626_n.jpg"
}).setDescription("``` ยังไม่ได้ตั่งค่าระบบ - Not setup yet ```").setColor("#E33A36").setTitle("เกิดข้อผิดพลาด").setTimestamp(new Date());