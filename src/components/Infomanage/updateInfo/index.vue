<!--// author:wr-->
<!--// time:2022/10/10-->
<template>
  <div class='update_detail'>
    <el-row class='tile-content shadows'>
      <el-col :span='23'>
        <div>详细信息</div>
      </el-col>
      <el-col :span='1'>
        <el-button size='mini' @click='back'>返回</el-button>
      </el-col>
    </el-row>
    <el-tabs v-model='tab_name' type='border-card' @tab-click='changeTab'>
      <el-tab-pane label='综合表' name='0' style='height: 75vh'>
        <el-form ref='form' :model='form = this.row' label-width='120px' :inline='true' class='demo-form-inline'>
          <el-row style='background: rgba(94,135,217,0.4)' v-show="currentShow === '2'">
            <el-col :span='2'>
              <div class='label-style'>单位</div>
            </el-col>
            <el-col :span='4'>
              <div class='label-style'>
                <el-input v-model='form.postName' />
              </div>
            </el-col>
            <el-col :span='2'>
              <div class='label-style'>部门</div>
            </el-col>
            <el-col :span='4'>
              <div class='label-style'>
                <el-input v-model='form.departmentName' />
              </div>
            </el-col>
            <el-col :span='2'>
              <div class='label-style'>设备类型</div>
            </el-col>
            <el-col :span='4'>
              <div class='label-style'>
                <el-input v-model='form.equipmentTypeName' />
              </div>
            </el-col>
            <el-col :span='2'>
              <div class='label-style'>设备编号</div>
            </el-col>
            <el-col :span='4'>
              <div class='label-style'>
                <el-input v-model='form.basicInfoId' />
              </div>
            </el-col>
          </el-row>
          <el-row style='background: rgba(94,135,217,0.4)' v-show="currentShow === '3'">
            <el-col :span='2'>
              <div class='label-style'>单位</div>
            </el-col>
            <el-col :span='4'>
              <div class='label-style'>
                <el-select v-model='form.postName' placeholder='请选择' @change='changePost'
                           :popper-append-to-body='false'>
                  <el-option
                    v-for='item in postAll'
                    :key='item.value'
                    :value='item.postName'
                  />
                </el-select>
              </div>
            </el-col>
            <el-col :span='2'>
              <div class='label-style'>部门</div>
            </el-col>
            <el-col :span='4'>
              <div class='label-style'>
                <el-select v-model='form.departmentName' placeholder='请选择'
                           @change='handleBaseInfoIdByDepartmentName'>
                  <el-option
                    v-for='item in departmentAll'
                    :key='item.value'
                    :value='item.departmentName'
                  />
                </el-select>
              </div>
            </el-col>
            <el-col :span='2'>
              <div class='label-style'>设备类型</div>
            </el-col>
            <el-col :span='4'>
              <div class='label-style'>
                <el-select v-model='form.equipmentTypeName' placeholder='请选择' filterable
                           @change='handleBaseInfoIdByEquipmentType'>
                  <el-option
                    v-for='item in equipmentTypeAll'
                    :key='item.value'
                    :value='item.equipmentTypeName'
                    :title='item.equipmentTypeName'
                  />
                </el-select>
              </div>
            </el-col>
            <el-col :span='2'>
              <div class='label-style'>设备编号</div>
            </el-col>
            <el-col :span='4'>
              <div class='label-style'>
                <el-input v-model='connectedA' :value='connectedA' />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <div class='label-style'>自定义字段</div>
          </el-row>
          <el-row style='background: rgba(94,135,217,0.4)'>
            <el-col :span='6' v-for='item in customFieldData' :key='item.label'>
              <el-col :span='8'>
                <div class='label-style'>{{item.label }}</div>
              </el-col>
              <el-col :span='16'>
                <div class='label-style'>
                  <el-input  v-model='form.customField[item.value]' />
                </div>
              </el-col>
            </el-col>
          </el-row>
          <hr>
        </el-form>
        <el-row v-show="currentShow === '3'">
          <el-col :span='2' :offset='9'>
            <el-button type='primary' @click='back'>取消</el-button>
          </el-col>
          <el-col :span='2'>
            <el-button type='primary' @click='commit'>提交</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label='详情表' name='1'>
        <div class='detail-content'>
          <div class='detail-table'>
            <el-row>
              <el-col :span='24'>
                <div class='grid-content bg-blue'><h4><b>信息资产基础信息表</b></h4></div>
              </el-col>
            </el-row>
            <div class='basic-info shadows'>
              <div class='basic-table'>
                <el-row>
                  <el-col>
                    <div class='padding-shipx shadows'>基本信息</div>
                  </el-col>
                </el-row>
                <el-form ref='form' :model='form = row' label-width='120px' :inline='true' class='gray-bg'>
                  <el-row v-show="currentShow === '2'">
                    <el-row>
                      <el-col :span='2'>
                        <div class='label-style'>设备名称</div>
                      </el-col>
                      <el-col :span='10'>
                        <div class='label-style'>
                          <el-input v-model='form.equipmentName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>主机名</div>
                      </el-col>
                      <el-col :span='10'>
                        <div class='label-style'>
                          <el-input v-model='form.hostName' size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='3'>
                        <div class='label-style'>硬件是否国产化</div>
                      </el-col>
                      <el-col :span='3'>
                        <div class='label-style'>
                          <el-input v-model='form.isChinaLocalization' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>设备状态</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='equipment.equipmentBaseInfo.status' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>所属资源池</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.pool' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='6'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.trueOrVirtual'>
                            <el-radio label='1'>实 体 机</el-radio>
                            <el-radio label='0'>虚 拟 机</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='2'>
                        <div class='label-style'>设备管理员</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.equipmentAdminName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>电 话</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.equipmentAdminPhone' size='medium' class='phone' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>应用管理员</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.appAdminName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>电 话</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.appAdminPhone' size='medium' class='phone' />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='6'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.businessOrExperimental'>
                            <el-radio label='0'>业 务 机</el-radio>
                            <el-radio label='1'>实 验 机</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                      <el-col :span='6'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.mainOrBackup'>
                            <el-radio label='0'>主 机</el-radio>
                            <el-radio label='1'>备 机</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                      <el-col :span='6'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.migratable'>
                            <el-radio label='0'>可 迁 移</el-radio>
                            <el-radio label='1'>不可迁移</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                      <el-col :span='6'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.shelfOff'>
                            <el-radio label='0'>可 下 架</el-radio>
                            <el-radio label='1'>不 可 下 架</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='2'>
                        <div class='label-style'>所属机房</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.machineRoomName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>所属机柜</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.cabinetName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>U位开始位</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.cabinetUStart' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>U位结束位</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.cabinetUEnd' size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='2'>
                        <div class='label-style'>品 牌</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.brandName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>型 号</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.brandModelName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>序列号</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.serialNumber' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>保修期</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.guaranteePeriod' size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='2'>
                        <div class='label-style'>上线时间</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-date-picker v-model='form.onlineTime' readonly='readonly' :editable='false' size='medium'
                                          :clearable='false' style='width:100%' value-format='yyyy-MM-dd'
                                          format='yyyy-MM-dd'></el-date-picker>
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>下线时间</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-date-picker v-model='form.offlineTime' readonly='readonly' size='medium'
                                          :clearable='false'
                                          format='yyyy-MM-dd' value-format='yyyy-MM-dd' style='width:100%' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>部署环境</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.deploymentEnvironment' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>备注</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.remarks' size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                  </el-row>
                  <el-row v-show="currentShow === '3'">
                    <el-row>
                      <el-col :span='2'>
                        <div class='label-style'>设备名称</div>
                      </el-col>
                      <el-col :span='10'>
                        <div class='label-style'>
                          <el-input v-model='form.equipmentName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>主机名</div>
                      </el-col>
                      <el-col :span='10'>
                        <div class='label-style'>
                          <el-input v-model='form.hostName' size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='3'>
                        <div class='label-style'>硬件是否国产化</div>
                      </el-col>
                      <el-col :span='3'>
                        <div class='label-style'>
                          <el-select v-model='form.isChinaLocalization' placeholder='请选择' clearable>
                            <el-option
                              v-for='item in isHomegrown'
                              :key='item.value'
                              :value='item.value'
                            />
                          </el-select>
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>设备状态</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-select v-model='equipment.equipmentBaseInfo.status' placeholder='请选择' clearable>
                            <el-option
                              v-for='item in statusItem'
                              :key='item.value'
                              :value='item.value'
                            />
                          </el-select>
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>所属资源池</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.pool' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='6'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.trueOrVirtual' :disabled='true'>
                            <el-radio label='1'>实 体 机</el-radio>
                            <el-radio label='0'>虚 拟 机</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='2'>
                        <div class='label-style'>设备管理员</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.equipmentAdminName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>电 话</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.equipmentAdminPhone' size='medium' class='phone' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>应用管理员</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.appAdminName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>电 话</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.appAdminPhone' size='medium' class='phone' />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='6'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.businessOrExperimental'>
                            <el-radio label='0'>业 务 机</el-radio>
                            <el-radio label='1'>实 验 机</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                      <el-col :span='6'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.mainOrBackup'>
                            <el-radio label='0'>主 机</el-radio>
                            <el-radio label='1'>备 机</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                      <el-col :span='6'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.migratable'>
                            <el-radio label='0'>可 迁 移</el-radio>
                            <el-radio label='1'>不可迁移</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                      <el-col :span='6'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.shelfOff'>
                            <el-radio label='0'>可 下 架</el-radio>
                            <el-radio label='1'>不 可 下 架</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='2'>
                        <div class='label-style'>所属机房</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-select v-model='form.machineRoomName' @change='SelectmachineRoomName'
                                     :disabled='isBanned === false'
                                     placeholder='请选择' filterable :popper-append-to-body='false'>
                            <el-option
                              v-for='item in machineRoomNames'
                              :key='item.value'
                              :value='item.machineRoomName'
                            />
                          </el-select>
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>所属机柜</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-select v-model='form.cabinetName' placeholder='请选择' :disabled='isBanned === false'
                                     clearable>
                            <el-option
                              v-for='item in cabinetAll'
                              :key='item.value'
                              :value='item.cabinetName'
                            />
                          </el-select>
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>U位开始位</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.cabinetUStart' :disabled='isBanned === false' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>U位结束位</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.cabinetUEnd' :disabled='isBanned === false' size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='2'>
                        <div class='label-style'>品 牌</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.brandName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>型 号</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.brandModelName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>序列号</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.serialNumber' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>保修期</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.guaranteePeriod' size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='2'>
                        <div class='label-style'>上线时间</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-date-picker v-model='form.onlineTime' size='medium' :clearable='false' style='width:100%'
                                          value-format='yyyy-MM-dd' format='yyyy-MM-dd'></el-date-picker>
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>下线时间</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-date-picker v-model='form.offlineTime' size='medium' :clearable='false'
                                          format='yyyy-MM-dd' value-format='yyyy-MM-dd' style='width:100%' />
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>部署环境</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-select v-model='form.deploymentEnvironment' placeholder='请选择' clearable>
                            <el-option
                              v-for='item in deploymentEnvironmentAll'
                              :key='item.value'
                              :value='item.value'
                            />
                          </el-select>
                        </div>
                      </el-col>
                      <el-col :span='2'>
                        <div class='label-style'>备注</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.remarks' size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                  </el-row>
                  <!---------------------------调拨移动信息开始------------------------------------------------>
                  <el-row>
                    <el-col :span='24'>
                      <div class='grid-content bg-blue-dark'><h4>调拨移动信息</h4></div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span='12'>
                      <el-row>
                        <el-col :span='24' class='grid-content'>
                          <div class='label-style'>
                            <el-radio-group v-model='form.isTransfer'>
                              <el-radio label='是'>存 在 调 拨</el-radio>
                              <el-radio label='否'>不 存 在 调 拨</el-radio>
                            </el-radio-group>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span='4'>
                          <div class='label-style'>调拨记录1</div>
                        </el-col>
                        <el-col :span='8'>
                          <div class='label-style'>
                            <el-input v-model='transferRecord1' :disabled="form.isTransfer === '否'" size='medium' />
                          </div>
                        </el-col>
                        <el-col :span='4'>
                          <div class='label-style'>调拨1时间</div>
                        </el-col>
                        <el-col :span='8'>
                          <div class='label-style'>
                            <el-input v-model='transferRecordTime1' :disabled="form.isTransfer === '否'"
                                      size='medium' />
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span='4'>
                          <div class='label-style'>调拨记录2</div>
                        </el-col>
                        <el-col :span='8'>
                          <div class='label-style'>
                            <el-input v-model='transferRecord2' :disabled="form.isTransfer === '否'" size='medium' />
                          </div>
                        </el-col>
                        <el-col :span='4'>
                          <div class='label-style'>调拨2时间</div>
                        </el-col>
                        <el-col :span='8'>
                          <div class='label-style'>
                            <el-input v-model='transferRecordTime2' :disabled="form.isTransfer === '否'"
                                      size='medium' />
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span='12'>
                      <el-row>
                        <el-col :span='24' class='grid-content'>
                          <div class='label-style'>
                            <el-radio-group v-model='form.isMoving'>
                              <el-radio label='是'>存 在 移 动</el-radio>
                              <el-radio label='否'>不 存 在 移 动</el-radio>
                            </el-radio-group>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span='4'>
                          <div class='label-style'>移动记录1</div>
                        </el-col>
                        <el-col :span='8'>
                          <div class='label-style'>
                            <el-input v-model='movingRecord1' :disabled="form.isMoving === '否'" size='medium' />
                          </div>
                        </el-col>
                        <el-col :span='4'>
                          <div class='label-style'>移动1时间</div>
                        </el-col>
                        <el-col :span='8'>
                          <div class='label-style'>
                            <el-input v-model='movingRecordTime1' :disabled="form.isMoving === '否'" size='medium' />
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span='4'>
                          <div class='label-style'>移动记录2</div>
                        </el-col>
                        <el-col :span='8'>
                          <div class='label-style'>
                            <el-input v-model='movingRecord2' :disabled="form.isMoving === '否'" size='medium' />
                          </div>
                        </el-col>
                        <el-col :span='4'>
                          <div class='label-style'>移动2时间</div>
                        </el-col>
                        <el-col :span='8'>
                          <div class='label-style'>
                            <el-input v-model='movingRecordTime2' :disabled="form.isMoving === '否'" size='medium' />
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <!---------------------------调拨移动信息结束------------------------------------------------>
                  <!---------------------------业务系统信息开始------------------------------------------------>
                  <el-row>
                    <el-col :span='24'>
                      <div class='grid-content bg-blue-dark' style='background-color: #547dbb'><h4>业务系统信息</h4>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row v-show="currentShow === '2'">
                    <el-row>
                      <el-col :span='3'>
                        <div class='label-style'>所属业务系统</div>
                      </el-col>
                      <el-col :span='5'>
                        <div class='label-style'>
                          <el-input v-model='form.businessSystemFirstName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='3'>
                        <div class='label-style'>所属业务子系统</div>
                      </el-col>
                      <el-col :span='5'>
                        <div class='label-style'>
                          <el-input v-model='form.businessSystem' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>所属业务子系统等保等级</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.businessSystemLevel' size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='3'>
                        <div class='label-style'>业务应用</div>
                      </el-col>
                      <el-col :span='5'>
                        <div class='label-style'>
                          <el-input v-model='form.businessApplicationName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='16' class='grid-content'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.isTestBusinessSystem'>
                            <el-radio label='正式业务'>正 式 业 务</el-radio>
                            <el-radio label='测试业务'>测 试 业 务</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                  </el-row>
                  <el-row v-show="currentShow === '3'">
                    <el-row>
                      <el-col :span='3'>
                        <div class='label-style'>所属业务系统</div>
                      </el-col>
                      <el-col :span='5'>
                        <div class='label-style'>
                          <el-select v-model='form.businessSystemFirstName' filterable @change='selectbusinessSubsystem'
                                     placeholder='请选择' :popper-append-to-body='false'>
                            <el-option
                              v-for='item in businessSystem'
                              :key='item.value'
                              :value='item.businessSystemFirstName'
                            />
                          </el-select>
                        </div>
                      </el-col>
                      <el-col :span='3'>
                        <div class='label-style'>所属业务子系统</div>
                      </el-col>
                      <el-col :span='5'>
                        <div class='label-style'>
                          <el-select v-model='form.businessSystem' filterable @change='bindLevel' placeholder='请选择'>
                            <el-option
                              v-for='item in successbusinessSubsystem'
                              :key='item.value'
                              :value='item.businessSystemName'
                            />
                          </el-select>
                        </div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>所属业务子系统等保等级</div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>
                          <el-input v-model='form.businessSystemLevel' size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='3'>
                        <div class='label-style'>业务应用</div>
                      </el-col>
                      <el-col :span='5'>
                        <div class='label-style'>
                          <el-input v-model='form.businessApplicationName' size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='16' class='grid-content'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.isTestBusinessSystem'>
                            <el-radio label='正式业务'>正 式 业 务</el-radio>
                            <el-radio label='测试业务'>测 试 业 务</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                  </el-row>
                  <!---------------------------业务系统信息结束------------------------------------------------------->
                  <!---------------------------其他信息开始------------------------------------------------------->
                  <el-row>
                    <el-col :span='24'>
                      <div class='grid-content bg-blue-dark' style='background-color: #54a3bb'><h4>其他信息</h4></div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span='3'>
                      <div class='label-style'>云服务单位</div>
                    </el-col>
                    <el-col :span='5'>
                      <div class='label-style'>
                        <el-input v-model='form.cloudServiceUnit' size='medium' />
                      </div>
                    </el-col>
                    <el-col :span='3'>
                      <div class='label-style'>租用网络带宽(兆)</div>
                    </el-col>
                    <el-col :span='5'>
                      <div class='label-style'>
                        <el-input v-model='form.leasedNetworkBandwidth' size='medium' />
                      </div>
                    </el-col>
                    <el-col :span='4'>
                      <div class='label-style'>租用存储资源情况(TB)</div>
                    </el-col>
                    <el-col :span='4'>
                      <div class='label-style'>
                        <el-input v-model='form.leasedStorageResources' size='medium' />
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span='3'>
                      <div class='label-style'>租用期限（年）</div>
                    </el-col>
                    <el-col :span='5'>
                      <div class='label-style'>
                        <el-input v-model='form.termOfLease' size='medium' />
                      </div>
                    </el-col>
                    <el-col :span='3'>
                      <div class='label-style'>NS记录</div>
                    </el-col>
                    <el-col :span='5'>
                      <div class='label-style'>
                        <el-input v-model='form.ns' size='medium' />
                      </div>
                    </el-col>
                    <el-col :span='4'>
                      <div class='label-style'>CNAME记录（别名）</div>
                    </el-col>
                    <el-col :span='4'>
                      <div class='label-style'>
                        <el-input v-model='form.cname' size='medium' />
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span='3'>
                      <div class='label-style'>网络区域</div>
                    </el-col>
                    <el-col :span='5'>
                      <div class='label-style'>
                        <el-input v-model='form.networkArea' size='medium' />
                      </div>
                    </el-col>
                    <el-col :span='3'>
                      <div class='label-style'>接入位置</div>
                    </el-col>
                    <el-col :span='5'>
                      <div class='label-style'>
                        <el-input v-model='form.accessLocation' size='medium' />
                      </div>
                    </el-col>
                    <el-col :span='4'>
                      <div class='label-style'>域名注册服务商</div>
                    </el-col>
                    <el-col :span='4'>
                      <div class='label-style'>
                        <el-input v-model='form.domainNameRegistrationService' size='medium' />
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span='8'>
                      <div class='label-style'>租用计算资源情况（CPU核数）（个）</div>
                    </el-col>
                    <el-col :span='8'>
                      <div class='label-style'>
                        <el-input v-model='form.leasedComputingResources' size='medium' />
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span='6' class='grid-content'>
                      <div class='label-style'>
                        <el-radio-group v-model='form.singleAndDoublePowerSupply'>
                          <el-radio label='单'>单 电 源</el-radio>
                          <el-radio label='双'>双 电 源</el-radio>
                        </el-radio-group>
                      </div>
                    </el-col>
                    <el-col :span='6' class='grid-content'>
                      <div class='label-style'>
                        <el-radio-group v-model='form.agreedToTemporaryShutdown'>
                          <el-radio label='是'>同意临时关停</el-radio>
                          <el-radio label='否'>不同意临时关停</el-radio>
                        </el-radio-group>
                      </div>
                    </el-col>
                    <el-col :span='6' class='grid-content'>
                      <div class='label-style'>
                        <el-radio-group v-model='form.useCDN'>
                          <el-radio label='是'>使用CDN</el-radio>
                          <el-radio label='否'>没有使用CDN</el-radio>
                        </el-radio-group>
                      </div>
                    </el-col>
                    <el-col :span='6' class='grid-content'>
                      <div class='label-style'>
                        <el-radio-group v-model='form.deployStrongPassword'>
                          <el-radio label='是'>是强口令部署</el-radio>
                          <el-radio label='否'>不是是强口令部署</el-radio>
                        </el-radio-group>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span='8' class='grid-content'>
                      <div class='label-style'>
                        <el-radio-group v-model='form.installSafetyMonitoringSoftware'>
                          <el-radio label='是'>安装安全监测软件</el-radio>
                          <el-radio label='否'>没有安装安全监测软件</el-radio>
                        </el-radio-group>
                      </div>
                    </el-col>
                    <el-col :span='8' class='grid-content'>
                      <div class='label-style'>
                        <el-radio-group v-model='form.allowVulnerabilityScanning'>
                          <el-radio label='是'>允许漏洞扫描</el-radio>
                          <el-radio label='否'>不允许漏洞扫描</el-radio>
                        </el-radio-group>
                      </div>
                    </el-col>
                  </el-row>
                  <!---------------------------其他信息结束------------------------------------------------------->
                </el-form>
                <el-row :gutter='20'>
                  <el-col :span='12'>
                    <othertable :hh='currentShow' :form='equipment.config' :lable='configLable' :ch=2>配置信息
                    </othertable>
                  </el-col>
                  <el-col :span='12'>
                    <othertable :hh='currentShow' :form='equipment.software' :lable='softwareLable' :ch=3>通用软件信息
                    </othertable>
                  </el-col>
                </el-row>
                <el-row :gutter='20'>
                  <el-col :span='12'>
                    <othertable :hh='currentShow' :form='equipment.network' :lable='networkLable'>网络信息</othertable>
                  </el-col>
                  <el-col :span='12'>
                    <othertable :hh='currentShow' :form='equipment.protocolPort' :lable='protocolPortLable'>
                      协议端口信息
                    </othertable>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class='business-info shadows'>
              <el-row>
                <el-col :span='24'>
                  <div class='grid-content bg-blue'><h4><b>业 务 应 用 信 息</b></h4></div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span='24'>
                  <othertable :hh='currentShow' :form='equipment.appSoftware' :lable='appSoftwareLable'>专用软件信息
                  </othertable>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span='24'>
                  <othertable :hh='currentShow' :form='equipment.appSystemUser' :lable='appSystemUserLable'>
                    系统用户信息
                  </othertable>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span='24'>
                  <othertable :hh='currentShow' :form='equipment.appBusiness' :lable='appBusinessLable'>业务应用
                  </othertable>
                </el-col>
              </el-row>
              <el-row :gutter='20'>
                <el-col :span='12'>
                  <othertable :hh='currentShow' :form='equipment.appAccessRights' :lable='appAccessRightsLable'>
                    访问权限
                  </othertable>
                </el-col>
                <el-col :span='12'>
                  <othertable :hh='currentShow' :form='equipment.appLinksInfo' :lable='appLinksInfoLable'>服务用户信息
                  </othertable>
                </el-col>
              </el-row>
              <el-row :gutter='20'>
                <el-col :span='12'>
                  <othertable :hh='currentShow' :form='equipment.appStore' :lable='appStoreLable'>存 储</othertable>
                </el-col>
                <el-col :span='12'>
                  <othertable :hh='currentShow' :form='equipment.appNativeStore' :lable='appNativeStoreLable'>本 机 存
                    储
                  </othertable>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <el-row v-show="currentShow === '3'">
          <el-col :span='2' :offset='11'>
            <el-button type='primary' @click='back'>取消</el-button>
          </el-col>
          <el-col :span='2'>
            <el-button type='primary' @click='commit'>提交</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      :visible.sync='showDialog'
      width='80%'
      title='查看反馈信息'>
      <div style='height:450px;text-align:center'>
        <!--需要弹出的内容部分-->
        插入成功
        <el-descriptions :column='3' border>
          <el-descriptions-item v-for='item in replayData' :key='item.key'>
            <template slot='label'>
              <i></i>
              {{ item.key }}
            </template>
            <el-tag
              size='small'
              :type="item.values === 'update' ? 'success' :'primary'">
              {{ item.values === 'update' ? '更新' : item.values }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <el-button @click='back' type='primary' style='margin-top: 10px;'>确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Othertable from '@/components/Infomanage/otherTable'
import { getCabinet, getDepartment, getEquipmentType, getMachineRoom, getPost } from '@/api/select'
import { addEquipment, getbasic, getEquipmentsByBaseInfoId } from '@/api/table'
import user from '@/store/modules/user'
import { analysisReply } from '@/utils/xlsx'
import { getAllFirstLevelBusinessSystem, getBusinessSystemAll, getCustomFieldData } from '@/api/baseparameter'

export default {
  components: {
    Othertable
  },
  props: {
    row: {
      type: Object,
      required: true
    },
    currentShow: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      customFieldData: [],//自定义表头
      isBanned: true,
      determineLevel: '',//确定的等保等级
      successbusinessSubsystem: [],//筛选之后的业务子系统
      businessSubsystem: [],//获取的业务子系统
      businessSystem: [],//获取的业务系统
      cabinetAll: [],//机柜
      machineRoomNames: [],//机房
      connectedPostCode: '',
      connectedDepartmentCode: '',
      connectedEquipmentTypeCode: '',
      connectBaseInfoId: '',
      connectNumber: '',
      isHomegrown: [{ label: 'isHomegrown', value: '是' }, { label: 'noHomegrown', value: '否' }],
      statusItem: [{ label: 'running', value: '在用' }, { label: 'stopped', value: '停用' }, {
        label: 'scrapped',
        value: '报废'
      }],
      deploymentEnvironmentAll: [{ name: 'internet', value: '互联网' }, { name: 'earthquake', value: '地震行业网' },
        { name: 'government', value: '政务外网' }, {
          name: 'earlyWarning',
          value: '预警网'
        }, { name: 'emergencyCommand', value: '应急指挥信息网' }],
      transferRecord1: this.row.transferRecord === null ? '' : this.row.transferRecord.split(';')[0],
      transferRecordTime1: this.row.transferRecordTime === null ? '' : this.row.transferRecordTime.split(';')[0],
      transferRecord2: this.row.transferRecord === null ? '' : this.row.transferRecord.split(';')[1],
      transferRecordTime2: this.row.transferRecordTime === null ? '' : this.row.transferRecordTime.split(';')[1],
      movingRecord1: this.row.movingRecord === null ? '' : this.row.movingRecord.split(';')[0],
      movingRecordTime1: this.row.movingRecordTime === null ? '' : this.row.movingRecordTime.split(';')[0],
      movingRecord2: this.row.movingRecord === null ? '' : this.row.movingRecord.split(';')[1],
      movingRecordTime2: this.row.movingRecordTime === null ? '' : this.row.movingRecordTime.split(';')[1],

      replayData: [],
      allTableData: [],
      dialogVisible: false,
      showDialog: false,
      tab_name: '0',
      roleid: user.state.roleid,
      department: {},
      equipmentType: {},
      equipment: {
        appSoftware: [{
          softwareName: '',
          softwareEdition: '',
          softwarePort: '',
          softwareOnlineTime: '',
          softwareDevelopCompany: '',
          softwareLiaison: ''
        }],
        equipmentBaseInfo: {
          equipmentId: '', //  设备id,后端生成
          equipmentTypeName: '', // 设备类型
          postName: '', // 单位名称
          cabinetUStart: '', // 机柜起点
          cabinetUEnd: '', // 机柜终点
          shelfOff: '', // 是否可下架
          dataSources: '', // 数据来源
          insertUserId: '', // 数据插入用户
          remarks: '', // 备注
          status: this.row.status === '0' ? '在用' : (this.row.status === '1' ? '停用' : '报废'), // 设备状态
          equipmentName: '', // 设备名称
          businessSystem: '', // 所属二级系统
          businessSystemLevel: '',//所属二级系统等保等级
          businessSystemFirstName: '',//所属一级业务系统
          hostName: '', // 主机名
          departmentName: '', // 部门
          basicInfoId: '', // 编号
          equipmentAdminName: '', // 设备管理员
          equipmentAdminPhone: '',
          appAdminName: '', // 应用管理员
          appAdminPhone: '',
          businessOrExperimental: '', // 业务机试验机
          mainOrBackup: '', // 主机 备机
          trueOrVirtual: '', // 实体机虚拟机
          migratable: '', // 是否可迁移
          brandName: '', // 品牌
          brandModelName: '', // 型号
          machineRoomName: '', // 安装位置
          cabinetName: '', // 机柜号
          serialNumber: '', // 序列号
          guaranteePeriod: '', // 保修期
          onlineTime: '', // 上线时间
          offlineTime: '', // 下线时间
          //新增字段
          accessLocation: '',//接入位置
          singleAndDoublePowerSupply: '',//单双电源
          agreedToTemporaryShutdown: '',//是否同意临时关停（是/否）
          installSafetyMonitoringSoftware: '',//是否安装安全监测软件
          deployStrongPassword: '',//是否部署强口令
          cloudServiceUnit: '',//云服务单位
          leasedComputingResources: '',//租用计算资源情况（CPU核数）（个）
          leasedStorageResources: '',//租用存储资源情况（TB）
          leasedNetworkBandwidth: '',//租用网络带宽（兆）
          termOfLease: '',//租用期限（年）
          // domainName: '',//域名
          domainNameRegistrationService: '',//域名注册服务商
          ns: '',//NS记录
          cname: '',//CNAME记录（别名）
          useCDN: '',//是否使用CDN
          deploymentEnvironment: '',//部署环境
          networkArea: '', //网络区域
          allowVulnerabilityScanning: '', //是否运行漏洞扫描

          isUpdate: false,//是否覆盖更新
          isChinaLocalization: '',//是否国产化
          isTestBusinessSystem: false, //正式或者测试业务
          pool: '',//所属资源池
          isTransfer: false,//是否存在调拨
          transferRecord: '',//设备调拨记录
          transferRecordTime: '',//设备调拨记录时间
          isMoving: false,//是否存在移动
          movingRecord: '',//设备移动记录
          movingRecordTime: '',//设备移动记录时间
          businessApplicationName: '',//业务应用名称、
          customField: ''
        },
        config: [{ projectName: '', type: '', frequency: '', corenessOrCapacity: '', quantity: '' }],
        software: [{ project: '', projectName: '', edition: '', type: '', softwareIsChinaLocalization: '' }],
        network: [{ networkCardName: '', ipAddress: '', macAddress: '', networkCardPort: '', switchInfo: '' }],
        protocolPort: [{ protocolName: '', appName: '', networkCardPort: '' }],
        appSystemUser: [{
          userName: '',
          realName: '',
          userLevel: '',
          localAccessMode: '',
          remoteAccessMode: '',
          createDate: '',
          other: ''
        }],
        appBusiness: [{ businessName: '', domainName: '', userScope: '', ICPNum: '' }],
        appAccessRights: [{ intranet: '', industryNetwork: '', internet: '', other: '' }],
        appLinksInfo: [{ company: '', userName: '', ipAddress: '', other: '' }],
        appStore: [{ volume: '', SAN_NAS: '', capacity: '' }],
        appNativeStore: [{ totalCapacity: '', usedSpace: '', unusedSpace: '', annualGrowthSpace: '' }]
      },
      // appNativeStoreLable: { total_capacity: '总容量', used_space: '已用空间', unused_space: '未用空间', annual_growth_space: '年增长空间' },
      configLable: {
        projectName: '项目',
        type: '类型',
        frequency: '频率',
        corenessOrCapacity: '核数/容量'
        // quantity: '数量'
      },
      softwareLable: {
        project: '项目',
        projectName: '名称',
        edition: '版本',
        type: '类型',
        softwareIsChinaLocalization: '软件是否国产'
      },
      networkLable: {
        networkCardName: '网卡',
        ipAddress: 'IP地址',
        macAddress: 'MAC地址'
        // networkCardPort: '交换机',
        // switchInfo: '端口'
      },
      protocolPortLable: { protocolName: '协议', appName: '应用名称', networkCardPort: '端口' },
      appSoftwareLable: {
        softwareName: '名称',
        softwareEdition: '版本',
        softwarePort: '端口',
        softwareOnlineTime: '上线时间',
        softwareDevelopCompany: '研发单位',
        softwareLiaison: '联系人'
      },
      appSystemUserLable: {
        userName: '用户名',
        realName: '使用人',
        userLevel: '级别权限',
        localAccessMode: '访问方式(本地/远程)',
        // remoteAccessMode: '远程访问方式',
        createDate: '创建时间',
        other: '其他'
      },
      appBusinessLable: {
        businessName: 'HTTP应用 / FTP应用',
        domainName: '域名/地址',
        userScope: 'ICP号',
        ICPNum: '用户范围'
      },
      appAccessRightsLable: { intranet: '内网', industryNetwork: '行内网', internet: '互联网', other: '其他' },
      appLinksInfoLable: { company: '单位', userName: '用户名', ipAddress: 'IP地址', other: '其他' },
      appStoreLable: { volume: '非本机卷信息', SAN_NAS: 'SAN/NAS分布式存储', capacity: '非本机已用/分配容量(G)' },
      appNativeStoreLable: {
        totalCapacity: '本地存储总容量',
        usedSpace: '本地存储已用空间',
        unusedSpace: '未用空间',
        annualGrowthSpace: '本地存储年增长空间'
      },
      KeySet: {
        config: ['projectName', 'type', 'frequency', 'corenessOrCapacity'],
        software: ['project', 'projectName', 'edition', 'type', 'softwareIsChinaLocalization'],
        network: ['networkCardName', 'ipAddress', 'macAddress'],
        protocolPort: ['protocolName', 'appName', 'networkCardPort'],
        appSoftware: ['softwareName', 'softwareEdition', 'softwarePort', 'softwareOnlineTime', 'softwareDevelopCompany', 'softwareLiaison'],
        appSystemUser: ['userName', 'realName', 'userLevel', 'localAccessMode', 'remoteAccessMode', 'createDate', 'other'],
        appBusiness: ['businessName', 'domainName', 'userScope', 'ICPNum'],
        appAccessRights: ['intranet', 'industryNetwork', 'internet', 'other'],
        appLinksInfo: ['company', 'userName', 'ipAddress', 'other'],
        appStore: ['volume', 'SAN_NAS', 'capacity'],
        appNativeStore: ['totalCapacity', 'usedSpace', 'unusedSpace', 'annualGrowthSpace']
      },
      postAll: [],
      departmentAll: [],
      equipmentTypeAll: [],
      active: 0
    }
  },
  created() {
    console.log('所属业务子系统：', this.row.businessSystem)
    this.fetchData()
  },
  computed: {
    connectedA() {
      //判断是虚拟机还是实体机，并做绑定
      if (this.connectedEquipmentTypeCode[1] === 'X' || this.connectedEquipmentTypeCode[1] === 'x') {
        this.equipment.equipmentBaseInfo.trueOrVirtual = '0'
        this.isBanned = false //如果是虚拟机就禁选
      } else {
        this.equipment.equipmentBaseInfo.trueOrVirtual = '1'
        this.isBanned = true
      }
      if (this.equipment.equipmentBaseInfo.postName === this.row.postName
        && this.equipment.equipmentBaseInfo.departmentName === this.row.departmentName
        && this.equipment.equipmentBaseInfo.equipmentTypeName === this.row.equipmentTypeName) {
        this.equipment.equipmentBaseInfo.basicInfoId = this.row.basicInfoId
        return this.row.basicInfoId
      } else {
        this.autoHandleBasicInfoId(this.connectBaseInfoId)
        this.equipment.equipmentBaseInfo.basicInfoId = this.connectBaseInfoId + this.connectNumber
        if (this.connectedEquipmentTypeCode !== '') {
          return this.equipment.equipmentBaseInfo.basicInfoId
        }
      }
    }
  },
  async mounted() {
    await getCustomFieldData().then(res => {
      class customField {
        constructor(label, value , data) {
          this.value = value
          this.label = label
          this.width = '200px'
          this.data = data
        }
      }
      for (let i = 0; i < res.data.total; i++) {
        let customFieldInstance = new customField
        customFieldInstance.label = res.data.items[i].fieldLabel
        customFieldInstance.value = res.data.items[i].fieldName
        if (this.row.customField ==null){
          this.row.customField={}
        }
        this.customFieldData.push(customFieldInstance)
      }
    })
    const list = document.getElementsByClassName('update_detail')[0]
    const inputDom = list.getElementsByTagName('input')
    if (this.currentShow === '2') {
      inputDom.forEach(e => {
        console.log(e.parentNode.classList)
        const parentNode = e.parentNode
        e.disabled = true
        if (parentNode.classList.contains('el-date-editor--date')) {
          e.readonly = 'readonly'
        } else {
          parentNode.classList.add('is-disabled')
        }

      })
    } else {
      inputDom.forEach(e => {
        const parentNode = e.parentNode
        parentNode.classList.remove('is-disabled')
      })
    }
  },
  methods: {
    bindLevel() {
      this.determineLevel = ''
      for (const element of this.successbusinessSubsystem) {
        if (this.form.businessSystem === element.businessSystemName) {
          this.determineLevel = element.businessSystemLevel
        }
      }
      this.form.businessSystemLevel = this.determineLevel
    },
    selectbusinessSubsystem() {//获取对应的二级业务系统
      this.form.businessSystem = ''
      this.form.businessSystemLevel = ''
      this.determineLevel = ''
      this.successbusinessSubsystem = []
      for (const element of this.businessSubsystem) {
        if (this.form.businessSystemFirstName === element.businessSystemFirstName) {
          this.successbusinessSubsystem.push(element)
        }
      }
    },
    SelectmachineRoomName() {//获取机房对应的机柜
      this.form.cabinetName = '',
        this.cabinetAll = []
      for (const element of this.machineRoomNames) {
        if (element.machineRoomName === this.form.machineRoomName) {
          this.machineRoomId = element.machineRoomId
          getCabinet(this.machineRoomId).then(response => {
            this.cabinetAll = response.data.items
          })
        }
      }
    },
    showResult() {
      this.showDialog = true
    },

    fetchData() {
      this.listLoading = true
      this.row.onlineTime = new Date(this.row.onlineTime)
      this.row.offlineTime = new Date(this.row.offlineTime)
      getMachineRoom(this.roleid).then(response => {
        this.machineRoomNames = response.data.items
      })
      getAllFirstLevelBusinessSystem().then(res => {
        this.businessSystem = res.data.items
      })
      const params = {
        dataName: ['111'],
        dataValue: '',
        status: '0'
      }
      getBusinessSystemAll(params).then((response) => {//获取业务子系统
        this.businessSubsystem = response.data.items
        this.total = response.data.total
        console.log('业务子系统', this.businessSubsystem)
      })
      getPost().then(response => {
        this.postAll = response.data.items
        this.postAll.forEach(element => {
          if (element.postName === this.row.postName) {
            this.equipment.equipmentBaseInfo.postName = element.postName
            this.connectedPostCode = element.postCode
            let postId = element.postId
            getDepartment(postId).then(response => {
              if (this.role === '部门管理员') {
                this.departmentAll = response.data.items.filter(element => element.departmentName === this.role_department_name)
                this.equipment.equipmentBaseInfo.departmentName = this.departmentAll[0].departmentName
                this.connectedDepartmentCode = this.departmentAll[0].departmentCode
              } else {
                this.departmentAll = response.data.items
                this.departmentAll.forEach(element => {
                  if (element.departmentName === this.row.departmentName) {
                    this.connectedDepartmentCode = element.departmentCode
                    this.equipment.equipmentBaseInfo.departmentName = element.departmentName
                  }
                })
              }
            })
          }
        })
      })

      /*      getDepartment(this.roleid).then(response => {
              this.departmentAll = response.data.items
              this.equipment.equipmentBaseInfo.departmentName = this.departmentAll[0].departmentName
            })*/


      getEquipmentType().then(response => {
        this.equipmentTypeAll = response.data.items
        this.equipmentTypeAll.forEach(element => {
          if (element.equipmentTypeName === this.row.equipmentTypeName) {
            this.connectedEquipmentTypeCode = element.equipmentTypeCode
            this.equipment.equipmentBaseInfo.equipmentTypeName = element.equipmentTypeName
          }
        })
      })


      getbasic(this.row.equipmentId).then(response => {
        const item = response.data.items
        for (const key in item) {
          if (Object.hasOwnProperty.call(item, key)) {
            const e = item[key]
            if (e !== null && e.length !== 0) {
              this.checkKey(key, e)
            }
          }
        }
      })
    },
    commit() {
      const equipments = []
      this.row.basicInfoId = this.equipment.equipmentBaseInfo.basicInfoId
      this.row.status = this.equipment.equipmentBaseInfo.status
      this.form.onlineTime = new Date(this.form.onlineTime)
      this.form.offlineTime = new Date(this.form.offlineTime)
      let formatOnlineTime = this.form.onlineTime.toLocaleDateString()
      let formatOfflineTime = this.form.offlineTime.toLocaleDateString()
      const equip = { ...this.equipment }
      const equipmentBaseInfo = equip.equipmentBaseInfo
      Object.keys(equipmentBaseInfo).forEach(key => {
        equipmentBaseInfo[key] = this.row[key] === undefined ? '' : this.row[key]
      })
      equip.equipmentBaseInfo.onlineTime = formatOnlineTime
      equip.equipmentBaseInfo.offlineTime = formatOfflineTime
      equip.appAccessRights = equip.appAccessRights[0]
      equip.appNativeStore = equip.appNativeStore[0]
      equip.equipmentBaseInfo.isUpdate = '是'
      console.log('设备状态;', equip.equipmentBaseInfo.status)
      equip.equipmentBaseInfo.status = equip.equipmentBaseInfo.status === '在用' ? '0' : (equip.equipmentBaseInfo.status === '停用' ? '1' : '2')

      // console.log(equip)
      equipments.push(equip)

      addEquipment({ equipments: equipments }).then(res => {
        console.log(res)
        if (res.status !== 200) {
          res.data = res.status === 201 ? res.message : res.data.equipmentBasicInfo.message
          this.$alert(res.data, '提示', {
            confirmButtonText: '确定',
            type: 'info',
            showClose: false
          }).then(() => {
            // this.$router.go(0)
          })
          this.showDialog = false
        } else {
          const result = analysisReply(res.data)
          console.log('#', result)
          this.replayData = result
          this.showDialog = true
        }
      }).catch(err => {
        console.log(err)
      })
    },

    changePost(selectedPostName) {
      this.postAll.forEach(postItem => {
        if (postItem.postName === selectedPostName) {
          this.connectedPostCode = postItem.postCode
          getDepartment(postItem.postId).then(response => {
            this.departmentAll = response.data.items
            this.row.departmentName = this.departmentAll[0].departmentName
            this.connectedDepartmentCode = response.data.items[0].departmentCode
            this.connectBaseInfoId = this.connectedPostCode + '-' + this.connectedDepartmentCode + '-' + this.connectedEquipmentTypeCode
          })
        }
      })
    },

    handleBaseInfoIdByDepartmentName(val) {
      this.departmentAll.forEach(departmentItem => {
        if (departmentItem.departmentName === val) {
          this.connectedDepartmentCode = departmentItem.departmentCode
          this.connectBaseInfoId = this.connectedPostCode + '-' + this.connectedDepartmentCode + '-' + this.connectedEquipmentTypeCode
        }
      })
    },

    handleBaseInfoIdByEquipmentType(val) {
      this.equipmentTypeAll.forEach(equipmentTypeItem => {
        if (equipmentTypeItem.equipmentTypeName === val) {
          this.connectedEquipmentTypeCode = equipmentTypeItem.equipmentTypeCode
          this.connectBaseInfoId = this.connectedPostCode + '-' + this.connectedDepartmentCode + '-' + this.connectedEquipmentTypeCode
        }
      })
    },
    async autoHandleBasicInfoId(incompleteConnectBaseInfoId) {
      await getEquipmentsByBaseInfoId(incompleteConnectBaseInfoId).then((response) => {
        // console.log("根据单位、部门、设备类型代码查找到的数据：", response.data);
        let allDataByBaseInfoId = response.data.items
        if (response.data.total !== null && this.connectedEquipmentTypeCode !== '') {
          const numbers = allDataByBaseInfoId.map((item) => {
            const baseInfoId = item.basicInfoId
            const splitIndex = baseInfoId.lastIndexOf('-')
            const numberStr = baseInfoId.slice(splitIndex + 1)
            return parseInt(numberStr, 10)
          })
          numbers.sort((a, b) => a - b)
          if (numbers[0] !== 1) {
            this.connectNumber = '-' + '0001'
          } else {
            let i
            for (i = 0; i < numbers.length - 1; i++) {
              if (numbers[i + 1] - numbers[i] > 1) {
                this.connectNumber = '-' + String(numbers[i] + 1).padStart(4, '0')
                break
              }
            }
            if (i === numbers.length - 1) {
              this.connectNumber = '-' + String(numbers[numbers.length - 1] + 1).padStart(4, '0')
            }
          }
        } else {
          this.connectNumber = '-' + '0001'
        }
      })
    },


    changeTab(name) {
    },
    back() {
      this.showDialog = false
      this.row.onlineTime = this.row.onlineTime.valueOf()
      this.row.offlineTime = this.row.offlineTime.valueOf()
      this.$emit('changeDiv', '0')
    },
    checkKey(listname, value) {
      const a = this.handleList(listname)
      const arr = []
      if (a !== -1) {
        const objKey = { ...this.equipment[a][0] }
        value.forEach(e => {
          const obj = { ...objKey }
          for (const k in obj) {
            if (Object.hasOwnProperty.call(obj, k)) {
              obj[k] = e[k] === undefined ? '' : e[k]
            }
          }
          //console.log(obj)
          arr.push(obj)
        })
        this.equipment[a] = arr
      }
    },
    handleList(listname) {
      for (const key in this.equipment) {
        if (Object.hasOwnProperty.call(this.equipment, key)) {
          if (listname.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
            return key
          }
        }
      }
      return -1
    }
  }
}
</script>

<style lang='less' scoped>
*, el-form-item__label {
  font-size: 18px;
}

.tile-content {
  padding: 9px;
  margin-bottom: 20px;
}

.shadows {
  box-shadow: 0 0 4px #0000004d !important;
}

.el-form-item__label {
  font-size: 18px !important;
}

.selectLabel {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 35px;
  font-weight: 700;
  font-size: 14px;
  color: #606266;
}

.detail-content {
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
  margin: 10px;
}

.detail-table {
  padding: 10px;
  border: 1px solid #dcd7d7;
}

.el-row {
  // margin-bottom: 20px;
  line-height: 33px;
  margin-bottom: 0px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-blue {
  background: #5db2ff;
  height: 55px;

  h4 {
    text-align: center;
    margin: 0;
    line-height: 55px;
    color: white;
  }
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.label-style {
  border-right: 1px solid #eee;
  border-top: 1px solid #eee;
  padding: 12px;
  text-align: center;
}

.gray-bg {
  background: #D6DCE4;
}

.padding-shipx {
  padding: 10px;
}

.el-radio {
  margin-right: 0px;
}

/deep/ .el-radio__label {
  font-size: 18px;
  font-weight: 500;
}

.bg-blue-dark {
  background: #1F4E78;
  height: 55px;

  h4 {
    text-align: center;
    margin: 0;
    line-height: 55px;
    color: white;
  }
}

.business-info {
  margin-top: 50px;
}

.el-radio:nth-of-type(1) {
  margin-right: 35px;
}

/deep/ .el-input.is-disabled .el-input__inner {
  color: #898585;
}

//选择框输入框保持一致
.el-select {
  display: inline-block;
  position: relative;
  width: 100%; /* 设置 el-select 宽度为100% */
}

/deep/ .el-form--inline .el-form-item__content {
  width: 100%;
}

//覆盖全局样式代码
.el-select-dropdown__item {
  height: 30px;
  flex: 1 0 20%;
  margin: 10px;
}

.phone {
  height: 1px !important;
  width: 100%;
}

/deep/ .el-select-dropdown__list {
  margin: 5px 20px 20px 5px !important;
  height: auto !important;
  width: 1200px !important;
  display: flex !important;
  justify-content: space-between !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  align-content: flex-start !important;
  align-items: stretch !important;
  max-height: 100vh !important;
  overflow-y: auto !important; /* 启用垂直滚动 */
}

/deep/ .el-select-dropdown__list::-webkit-scrollbar {
  width: 0; /* 隐藏滚动条宽度 */
  height: 0; /* 隐藏滚动条高度 */
}

/deep/ .el-select-dropdown__list::-webkit-scrollbar-thumb {
  background: transparent; /* 隐藏滚动条拖动按钮 */
}
</style>
